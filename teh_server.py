import flask
from ENT_sql import init_cart, sql_write, sql_read
from ENT_assets import build_response, html_dict, user_gen, column_dict, price_dict, color_dict, transact_gen, send_message
from flask import session, request, jsonify
from flask.json import loads, tojson_filter
from time import time
from waitress import serve


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
			for i in range(len(mod["colors"])):
				mod["colors"][i] = color_dict[mod["colors"][i]]
			ship_these.update({str(num):mod["size"] + "||" + mod["material"] + "||" + mod["style"] + "||" + mod["colors"] + "||" + mod["comments"]})
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

serve(ENT_server, host='0.0.0.0', port=8080)