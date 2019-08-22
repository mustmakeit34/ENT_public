import flask
import sqlite3

html_dict = {'About/about': "about", 'Products/products': "products",
             'Gallery/gallery': "gallery", 'Contact/contact': "contact",
             'Maple/maple': "maple", 'Ash/ash': "ash",
             'Hybrid/hybrid': "hybrid", 'Zjelezyaka/zjel': "zjel",
             'V_3/V_3': "V_3", 'V_25/V_25': "V_25"}

column_dict = {
	"1": "UPDATE cart SET item_1=? WHERE s_id=?",
	"2": "UPDATE cart SET item_2=? WHERE s_id=?",
	"3": "UPDATE cart SET item_3=? WHERE s_id=?",
	"4": "UPDATE cart SET item_4=? WHERE s_id=?",
}

def sql_write(write_command, *args):
	conn = sqlite3.connect('ENT_db.db')
	conn.commit()
	c = conn.cursor()
	c.execute(write_command, args)
	conn.commit()
	conn.close()

def sql_read(read_command, *args):
	fetched = []
	conn = sqlite3.connect('ENT_db.db')
	conn.commit()
	c = conn.cursor()
	c.execute(read_command, args)
	fetched.append(c.fetchone())
	conn.commit()
	conn.close()
	return fetched

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




