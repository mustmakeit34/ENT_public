import flask
import sqlite3

html_dict = {'About/about': "about", 'Products/products': "products",
             'Gallery/gallery': "gallery", 'Contact/contact': "contact",
             'Maple/maple': "maple", 'Ash/ash': "ash",
             'Hybrid/hybrid': "hybrid", 'Zjelezyaka/zjel': "zjel",
             'V_3/V_3': "V_3", 'V_25/V_25': "V_25", 'order_status/order_status':"order_status"}

column_dict = {
	"1": "UPDATE cart SET item_1=? WHERE s_id=?",
	"2": "UPDATE cart SET item_2=? WHERE s_id=?",
	"3": "UPDATE cart SET item_3=? WHERE s_id=?",
	"4": "UPDATE cart SET item_4=? WHERE s_id=?",
}

price_dict = {
	"21700mapleV_25" : 250, "21700mapleV_3" : 270,	"21700ashV_25" : 300, "21700ashV_3" : 320,
	"21700hybridV_25" : 250, "21700hybridV_3" : 270, "21700zjelV_25" : 195,
	"18650mapleV_25" : 230, "18650mapleV_3" : 250, "18650ashV_25" : 280, "18650ashV_3" : 300,
	"18650hybridV_25" : 230, "18650hybridV_3" : 250, "18650zjelV_25" : 175,
}

def build_response(built_template, el_type_str):
	if el_type_str == "html":
		response = flask.make_response(built_template)
		response.headers['cache-control'] = "private, no-cache, max-age=86400"
		return response
	
	elif el_type_str == "css":
		response = flask.make_response(built_template)
		response.headers['cache-control'] = "private, max-age=900"
		return response
	
	elif el_type_str == "js":
		response = flask.make_response(built_template)
		response.headers['cache-control'] = "private, no-store"
		return response
	
	elif el_type_str == "img":
		response = flask.make_response(built_template)
		response.headers['cache-control'] = "private, max-age=900"
		return response

def new_user():
	conn = sqlite3.connect('ENT_db.db')
	c = conn.cursor()
	c.execute("SELECT max(s_id) FROM cart")
	max_value = c.fetchone()[0]
	if max_value: int(max_value)
	conn.commit()
	conn.close()
	while True:
		for new_user in range((max_value+1 if max_value else 100000),1000000):
			conn = sqlite3.connect('ENT_db.db')
			c = conn.cursor()
			c.execute(f"SELECT s_id FROM cart WHERE s_id='{new_user}'")
			id_already_exists = c.fetchone()
			conn.commit()
			conn.close()
			if not id_already_exists:
				yield new_user
user_gen = new_user()

def new_payment():
	conn = sqlite3.connect('ENT_db.db')
	c = conn.cursor()
	c.execute("SELECT max(t_id) FROM paid")
	max_value = c.fetchone()[0]
	if max_value: int(max_value)
	conn.commit()
	conn.close()
	while True:
		for new_transact in range((max_value+1 if max_value else 100000),1000000):
			conn = sqlite3.connect('ENT_db.db')
			c = conn.cursor()
			c.execute(f"SELECT t_id FROM paid WHERE s_id='{new_transact}'")
			id_already_exists = c.fetchone()
			conn.commit()
			conn.close()
			if not id_already_exists:
				yield new_transact
transact_gen = new_payment()