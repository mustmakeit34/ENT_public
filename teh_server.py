import flask
from ENT_sql import init_cart, init_paid, sql_write, sql_read
from ENT_assets import build_response, html_dict, user_gen, column_dict, price_dict, transact_gen, send_message
from flask import session, request, jsonify
from flask.json import loads, tojson_filter
from time import time, sleep
from waitress import serve
from werkzeug.datastructures import ImmutableMultiDict
import requests


ENT_server = flask.Flask(__name__)
ENT_server.config['SECRET_KEY'] = 'i%fee1@h0m3n0w&uR2blAmE'

@ENT_server.route('/give.status')
def give_status():
	session_id = session.get('id', None)
	notif = sql_read("SELECT notification FROM cart WHERE s_id=?", session_id)[0]
	if not notif: return "", 404
	return build_response(notif, 'js')

@ENT_server.route('/')
def home_redirect():
	return flask.redirect('/Products/products.html')

@ENT_server.route('/ipn/',methods=['POST', 'GET'])
def ipn():
	try:
		arg = ''
		request.parameter_storage_class = ImmutableMultiDict
		values = request.form
		for x, y in values.iteritems():
			arg += "&{x}={y}".format(x=x,y=y)
		
		validate_url = 'https://sandbox.paypal.com/cgi-bin/websc?cmd=_notify-validate{arg}'.format(arg=arg)
		r = requests.get(validate_url)
		if r.text == 'VERIFIED':
			try:
				payer_email = request.form.get('payer_email')
				unix = int(time())
				payment_date = request.form.get('payment_date')
				first_name = request.form.get('last_name')
				last_name = request.form.get('last_name')
				street_address = request.form.get('address_street')
				city = request.form.get('address_city')
				state = request.form.get('address_state')
				zip_code = request.form.get('address_zip')
				country = request.form.get('address_country')
				item_1 = loads(request.form.get('item_name_1'))
				amount_1 =  float(request.form.get('amount_1'))
				item_2 =  loads(request.form.get('item_name_2'))
				amount_2 = float(request.form.get('amount_2'))
				item_3 = loads(request.form.get('item_name_3'))
				amount_3 = float(request.form.get('amount_3'))
				item_4 = loads(request.form.get('item_name_4'))
				amount_4 = float(request.form.get('amount_4'))
				item_5 = loads(request.form.get('item_name_4'))
				amount_5 = float(request.form.get('amount_4'))
				payment_gross = float(request.form.get('payment_gross'))
				payment_fee = float(request.form.get('payment_fee'))
				payment_net = payment_gross - payment_fee
				payment_status = request.form.get('payment_status')
				user_id = int(request.form.get('os0'))
				ipn_items = [item_1, item_2, item_3, item_4, item_5]
				true_prices = {}
				ipn_amounts = [amount_1, amount_2, amount_3, amount_4, amount_5]
				item_num = 0
				no_shipping = False
				bad_shipping = False
				shipping = None
				for item in ipn_items:
					item_num += 1
					if item == "shipping":
						shipping = (item_1 if item_num==1 else item_2 if item_num==2 else item_3 if item_num==3 else item_4 if item_num==4 else item_5)
						if shipping not in (18, 48): bad_shipping = True
					elif item_num == 4 and shipping is None:
						no_shipping = True
						shipping = 0
				if not no_shipping:
					if item_num == 5:
						del ipn_items[4]
						del item_5
					elif item_num == 4:
						del ipn_items[3]
						item_4 = ""
					elif item_num == 3:
						del ipn_items[2]
						item_3 = ""
					elif item_num == 2:
						del ipn_items[1]
						item_2 = ""
					elif item_num == 1:
						del ipn_items[0]
						item_1 = ""
				counter = 0
				for mod in ipn_items:
					if mod:
						counter += 1
						true_price = price_dict.get(mod.get('size', '') + mod.get('material', '') + mod.get('style', ''),0)
						true_prices.update({f"item_{counter}":true_price})
				true_gross = sum(true_prices)
				disparity = payment_gross - shipping - true_gross
				user_ip = sql_read("""SELECT ip FROM cart WHERE s_id=?""", user_id)[0]
				sql_write(
					"""INSERT into paid (t_id, s_id, f_name, l_name, email, item_1, item_2, item_3, item_4, shipping, gross,
					   fee, net, status, address, city, state, zip_code, country, ip, order_date, order_time)
					   VALUES(:t_id, :s_id, :f_name, :l_name, :email, :item_1, :item_2, :item_3, :item_4, :shipping, :gross, :fee, :net,
					   :status, :address, :city, :state, :zip_code, :country, :ip, :order_date, :order_time)""",
					   {"t_id": next(transact_gen), "s_id": user_id, "f_name":first_name, "l_name":last_name,
					    "email": payer_email, "item_1":item_1, "item_2":item_2, "item_3":item_3, "item_4":item_4,
					    "gross": payment_gross, "fee":payment_fee, "net":payment_net, "status":payment_status,
					    "address":street_address, "city":city, "state":state, "zip_code":zip_code, "country":country,
					    "ip":user_ip, "order_date":payment_date, "order_time":unix, "shipping":shipping}
				)
				sql_write(
					"UPDATE cart SET notification='?' WHERE s_id='?'",
					    f"{item_1}={true_prices.get('item_1')}; you paid:{ipn_amounts[0]}\n{item_2}={true_prices.get('item_2')}; you paid:{ipn_amounts[1]}, \
					    \n{item_3}={true_prices.get('item_3')}; you paid:{ipn_amounts[2]}\n{item_4}={true_prices.get('item_4')}; you paid:{ipn_amounts[3]}  \
					    \nshipping={(shipping if not no_shipping else 'you paid no shipping')}; your shipping amount is {('valid' if not bad_shipping else 'invalid')} (18.00 and 48.00 are the only valid amounts) \
					    your order is {('valid' if not disparity else 'invalid')}; {('' if not disparity else f'disparity between your payment and the expected total is {disparity}')} \
					    {('' if not disparity else 'you paid too much' if disparity > 0 else 'you paid too little')}",
					    user_id
				)
			except Exception as e:
				pass
			# 	with open('/tmp/ipnout.txt', 'a') as f:
			# 		data = 'ERROR WITH IPN DATA\n' + str(values) + '\n'
			# 		f.write(data)
			#
			#
			# with open('/tmp/ipnout.txt', 'a') as f:
			# 	data = 'SUCCESS\n' + str(values) + '\n'
			# 	f.write(data)
			
			send_message("ipn notification", str(values))
	
	except Exception as e:
		pass


@ENT_server.route('/<path:shipping>.lets_go')
def lets_go(shipping):
	session_id = session.get('id', None)
	mods = sql_read("SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id)
	ship_these = {}
	prices = {}
	print(mods)
	for num, mod in enumerate(mods):
		if mod:
			mod = flask.Markup.unescape(mod)
			mod = flask.json.loads(mod)
			ship_these.update({str(num):mod["size"] + "||" + mod["material"] + "||" + mod["style"]})
			prices.update({str(num) : mod["price"]})
	print(ship_these, len(ship_these))
	template = flask.render_template('modal.html', num_of_items=len(ship_these), item=ship_these, price=prices, shipping=("48.00" if shipping=="fast" else "18.00"))
	print(template)
	return build_response(template,"js")

@ENT_server.route('/<path:html>.html')
def get_html(html):
	session_id = session.get('id', None)
	user_ip = request.environ['REMOTE_ADDR']
	mods = None
	if session_id:
		mods = sql_read("SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id)
	if not session_id or not mods:
		new_user = next(user_gen)
		print(new_user)
		session['id'] = new_user
		sql_write("INSERT INTO cart(s_id,ip) VALUES(?,?)", new_user, user_ip),
		sql_write("UPDATE cart SET delete_by=? WHERE s_id=?",time()+86400, new_user)
	template =  flask.render_template(f'{html_dict[html]}.html', style_sheet=f'href={html_dict[html]}.css',
                                      js_file=f'src={html_dict[html]}.js')
	return build_response(template, "html")

@ENT_server.route('/<path:css>.css')
def get_css(css):
	template = flask.send_file(f'static/{css}.css', mimetype='text/css')
	return build_response(template, "css")

@ENT_server.route('/<path:js>.js')
def get_js(js):
	template = flask.send_file(f'static/{js}.js', mimetype='text/javascript')
	return build_response(template, "js")

@ENT_server.route('/<path:image>.jpeg')
def get_jpeg(image):
	template = flask.send_file(f'static/{image}.jpeg', mimetype='image/jpeg')
	return build_response(template, "img")

@ENT_server.route('/<path:image>.jpg')
def get_jpg(image):
	template = flask.send_file(f'static/{image}.jpg', mimetype='image/jpeg')
	return build_response(template, "img")

@ENT_server.route('/<path:image>.png')
def get_png(image):
	template = flask.send_file(f'static/{image}.png', mimetype='image/png')
	return build_response(template, "img")

@ENT_server.route('/<path:mod>.json', methods=['POST'])
def handle_mod(mod):
	cart_items= []
	session_id = session.get('id', None)
	req_dict = flask.request.form.to_dict()
	teh_mod = None
	for i in req_dict:
		teh_mod = i
	if teh_mod: teh_mod = loads(teh_mod)
	if mod == "mod":
		sub_size = teh_mod.get("size", None)
		sub_material = teh_mod.get("material", None)
		sub_style = teh_mod.get("style", None)
		sub_price = teh_mod.get("price", None)
		verified = False
		verify_price = None
		if sub_size and sub_material and sub_style and sub_price:
			try: verify_price = price_dict[sub_size+sub_material+sub_style]
			except LookupError as e:
				print(e, "not valid mod type")
			if verify_price:
				if verify_price == sub_price:
					verified = True
		if verified:
			teh_mod = tojson_filter(teh_mod)
			teh_mod = flask.Markup.unescape(teh_mod)
			cart_items = sql_read(
				"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
			)
			first_null = None
			for item, row in zip(cart_items, range(1, 11)):
				if not item:
					if not first_null:
						first_null = row
			if first_null:
				sql_write(column_dict[str(first_null)], teh_mod, session_id)
		else:
			print("invalid mod-price")
	elif mod == "remove" and teh_mod:
		print("remove", teh_mod)
		cart_items = sql_read(
			"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
		)
		done = False
		for item, row in zip(cart_items, range(1, 11)):
			if item:
				item = flask.Markup.unescape(item)
				item = loads(item)
				print(item, teh_mod)
				print(item == teh_mod)
			if item == teh_mod and not done:
				done = True
				sql_write(column_dict[str(row)], None, session_id)
	cart_items = sql_read(
		"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
	)
	send_this = []
	for r_mod in cart_items:
		if r_mod:
			r_mod = flask.Markup.unescape(r_mod)
			send_this.append(r_mod)
	send_this = jsonify(send_this)
	return build_response(send_this, "js")

try:
	init_cart()
except:
	pass

try:
	init_paid()
except:
	pass

serve(ENT_server, host='0.0.0.0', port=8080)