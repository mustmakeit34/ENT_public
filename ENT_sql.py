import sqlite3
from time import time

def init_cart():
	conn = sqlite3.connect('ENT_db.db')
	cursor = conn.cursor()
	cursor.execute("""CREATE TABLE cart(s_id INTEGER PRIMARY KEY, item_1 TEXT, item_2 TEXT, item_3 TEXT,
	                                    item_4 TEXT, delete_by FLOAT, ip TEXT)""")
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

def cleanup_db():
	conn = sqlite3.connect('ENT_db.db')
	conn.commit()
	c = conn.cursor()
	c.execute("DELETE from cart where delete_by <= ?", (time(),))
	conn.commit()
	conn.close()