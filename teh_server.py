from os.path import exists
import flask
from ENT_sql import init_table
from ENT_assets import build_response, html_dict, user_gen, sql_write, sql_read, column_dict
from flask import session, request, escape
import sqlite3
from time import time
from waitress import serve



ENT_server = flask.Flask(__name__)
ENT_server.config['SECRET_KEY'] = 'i%fee1@h0m3n0w&uR2blAmE'

@ENT_server.route('/')
def home_redirect():
	return flask.redirect('/Products/products.html')

@ENT_server.route('/<path:shipping>.lets_go')
def lets_go(shipping):
	session_id = session.get('id', None)
	mods = sql_read("SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id)
	mods = mods[0]
	ship_these = {}
	prices = {}
	print(mods)
	for num, mod in enumerate(mods):
		if mod:
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
	try_it = None
	if session_id:
		try_it = sql_read("SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id)
		try_it = try_it[0]
	if not session_id or not try_it:
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
	if mod == "mod":
		cart_items = sql_read(
			"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
		)
		cart_items = cart_items[0]
		first_null = None
		for item, row in zip(cart_items, range(1, 11)):
			if not item:
				if not first_null:
					first_null = row
		if first_null:
			sql_write(column_dict[str(first_null)], teh_mod, session_id)
	elif mod == "remove":
		cart_items = sql_read(
			"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
		)
		cart_items = cart_items[0]
		done = False
		for item, row in zip(cart_items, range(1, 11)):
			if item == teh_mod and not done:
				done = True
				sql_write(column_dict[str(row)], None, session_id)
	cart_items = sql_read(
		"SELECT item_1, item_2, item_3, item_4 FROM cart WHERE s_id=?", session_id
	)
	send_this = []
	for i in cart_items[0]:
		if i: send_this.append(i)
	send_this = flask.jsonify(send_this)
	return build_response(send_this, "js")


if not exists('ENT_db.db'):
	init_table()

serve(ENT_server, host='0.0.0.0', port=8080)