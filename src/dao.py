import MySQLdb


class Dao:
    def __init__(self):
        self.db = MySQLdb.connect(host="localhost",
                                  user="root",
                                  password="root",
                                  db="vital_cases")
        self.cursor = self.db.cursor()

    def insertItem(self, name, app_id, quality):
        sql = "insert into items ( name, app_id, quality) VALUES (%s,%s,%s)"

        data = [
            (name, app_id, quality)
        ]
        self.cursor.executemany(sql, data)
        self.db.commit()
        return

    def close(self):
        self.db.close()
