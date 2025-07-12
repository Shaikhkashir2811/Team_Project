import sqlite3
import pandas as pd
d = pd.read_excel('skills.xlsx', sheet_name='Skills', usecols='A').dropna().to_csv('skills.csv', index=False)

# conn = sqlite3.connect('skills.db')
# cur = conn.cursor()

# cur.execute('DROP TABLE IF EXISTS skills')
# cur.execute('CREATE TABLE skills (id INTEGER PRIMARY KEY, name TEXT)')
# cur.executemany('INSERT INTO skills (name) VALUES (?)', [(skill,) for skill in skills])
# conn.commit()
# conn.close()

print(d)