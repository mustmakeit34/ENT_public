import sqlite3

def init_table():
	conn = sqlite3.connect('ENT_db.db')
	cursor = conn.cursor()
	cursor.execute("""CREATE TABLE cart(s_id INTEGER PRIMARY KEY, item_1 TEXT, item_2 TEXT, item_3 TEXT, item_4 TEXT,
	                delete_by FLOAT, ip TEXT)""")
	conn.close()

