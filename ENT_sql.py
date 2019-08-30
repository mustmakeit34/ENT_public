import sqlite3

def init_cart():
	conn = sqlite3.connect('ENT_db.db')
	cursor = conn.cursor()
	cursor.execute("""CREATE TABLE cart(s_id INTEGER PRIMARY KEY, item_1 TEXT, item_2 TEXT, item_3 TEXT,
	                                    item_4 TEXT, delete_by FLOAT, ip TEXT, notification TEXT)""")
	conn.close()

def init_paid():
	conn = sqlite3.connect('ENT_db.db')
	cursor = conn.cursor()
	cursor.execute("""CREATE TABLE paid(t_id INTEGER PRIMARY KEY, s_id INTEGER, f_name TEXT, l_name TEXT, email TEXT,
	                  item_1 TEXT, item_2 TEXT, item_3 TEXT, item_4 TEXT, shipping TEXT, gross FLOAT, fee FLOAT, net FLOAT,
	                  address TEXT, city TEXT, state TEXT, zip_code TEXT, country TEXT, ip TEXT, status TEXT,
	                  order_date TEXT, order_time INTEGER)""")
	conn.close()

def sql_write(write_command, *args):
	conn = sqlite3.connect('ENT_db.db')
	conn.commit()
	c = conn.cursor()
	c.execute(write_command, args)
	conn.commit()
	conn.close()

def sql_read(read_command, *args):
	conn = sqlite3.connect('ENT_db.db')
	conn.commit()
	c = conn.cursor()
	c.execute(read_command, args)
	fetched = c.fetchone()
	conn.commit()
	conn.close()
	return fetched

