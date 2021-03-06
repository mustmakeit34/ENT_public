import flask
import sqlite3
import requests

html_dict = {'About/about': "about", 'Products/products': "products",
             'Gallery/gallery': "gallery", 'Contact/contact': "contact",
             'Maple/maple': "maple", 'Ash/ash': "ash",
             'Hybrid/hybrid': "hybrid", 'Zjelezyaka/zjel': "zjel",
             'V_3/V_3': "V_3", 'V_25/V_25': "V_25",
             'Mobile/mobile' : "mobile", 'Mobile/bootstrap.min.css' : "bootstrap.min.css"}

column_dict = {"1": "UPDATE cart SET item_1=? WHERE s_id=?",
	           "2": "UPDATE cart SET item_2=? WHERE s_id=?",
	           "3": "UPDATE cart SET item_3=? WHERE s_id=?",
	           "4": "UPDATE cart SET item_4=? WHERE s_id=?"}

color_dict = {"#0500ab" : 'dark_blue',
	          "#2bc5ff" : 'sky_blue',
	          "#c80000" : 'red',
	          "#ff9321" : 'orange',
	          "#5b0089" : 'purple',
	          "#ff00ff" : 'pink',
	          "#0d9000" : 'green',
	          "#8bff00" : 'lime',
	          "#ffcd00" : 'gold',
	          "#fff827" : 'yellow',
	          "#543a27" : 'no_dye',
	          "#ffffff" : 'custom'}

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
	while True:
		conn = sqlite3.connect('ENT_db.db')
		c = conn.cursor()
		c.execute("SELECT max(s_id) FROM cart")
		max_value = c.fetchone()
		if max_value: max_value = max_value[0]
		conn.commit()
		conn.close()
		for new_user_id in (range(max_value+1, 1000000) if (max_value and max_value<999999) else
		        range(find_empty_slot(), find_empty_slot()+1) if max_value else range(100000, 1000000)):
			conn = sqlite3.connect('ENT_db.db')
			c = conn.cursor()
			c.execute(f"SELECT s_id FROM cart WHERE s_id='{new_user_id}'")
			id_already_exists = c.fetchone()
			conn.commit()
			conn.close()
			if not id_already_exists:
				yield new_user_id
user_gen = new_user()

def find_empty_slot():
	conn = sqlite3.connect('ENT_db.db')
	c = conn.cursor()
	c.execute(f"SELECT s_id FROM cart")
	already_exist = c.fetchall()
	already_exist = [i[0] for i in already_exist]
	for slot in range(100000,1000000):
		if slot not in already_exist:
			return slot
	conn.commit()
	conn.close()
