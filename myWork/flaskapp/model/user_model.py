import mysql.connector
import json
from flask import make_response
class user_model():
    def __init__(self):
        #connection establishment code
        try:
            self.con=mysql.connector.connect(
                host="Localhost",
                user="root",
                password="Harsh@2023",
                database="dataset")
            self.con.autocommit=True
            self.cur=self.con.cursor(dictionary=True)
            print("Conection successful")
        except mysql.connector.Error as err:
            print("Error:", err)

    def user_getall_model(self):
        self.cur.execute("SELECT * FROM users")
        result = self.cur.fetchall()
        if len(result)>0:
            res = make_response({"payload":result},200)
            res.headers['Access-Control-Allow-Origin']="*"
            return res
            #return json.dumps(result)
            #return {"payload":result}
            #return make_response({"payload":result},200)
        else:
            #return {"message":"NO DATA FOUND"}
            return make_response({"message":"NO DATA FOUND"},204)
        
    def user_addone_model(self,data):
        self.cur.execute(f"INSERT INTO users(name,email,phone,role,password)VALUES('{data['name']}','{data['email']}','{data['phone']}','{data['role']}','{data['password']}')")
        #return "User Created Successully"
        #return {"message":"User Created successfully"}
        return make_response({"message":"User Created successfully"},201)
    
    def user_update_model(self,data):
        self.cur.execute(f"UPDATE users SET name='{data['name']}', email='{data['email']}', phone='{data['phone']}', role='{data['role']}', password='{data['password']}' WHERE id={data['id']}")
        if self.cur.rowcount>0:
            #return "User Updated Successully"
            #return {"message":"User Updated Successsully"}
            return make_response({"message":"User Updated Successsully"},201)
        else:
            #return "Nothing to update"
            #return {"message":"Nothing to update"}
            return make_response({"message":"Nothing to update"},202)
        
    def user_delete_model(self,id):
        self.cur.execute(f"DELETE FROM users WHERE id={id}")
        if self.cur.rowcount>0:
            #return "User Deleted Successully"
            #return {"message":"User Deleted Successfully"}
            return make_response({"message":"User Deleted Successfully"},200)
        else:
            #return "Nothing to delete"
            #return {"message":"Nothing to delete"}
            return make_response({"message":"Nothing to delete"},202)
        
    def user_patch_model(self, data, id):
        qry = "UPDATE users SET "
        for key in data:
            qry += f"{key}='{data[key]}',"
        qry = qry[:-1] + f" WHERE id={id}"
        self.cur.execute(qry)
        if self.cur.rowcount>0:
            return make_response({"message":"User Updated Successsully"},201)
        else:
            return make_response({"message":"Nothing to update"},202)
        # UPDATE users SET col=val, col=val WHERE id={id}
        #return "This is user patch model"

    def user_pagination_model(self, limit, page):
        limit = int(limit)
        page = int(page)
        start = (page*limit)-limit
        qry = f"SELECT * FROM users LIMIT {start}, {limit}"
        self.cur.execute(qry)
        result = self.cur.fetchall()
        if len(result)>0:
            res = make_response({"payload":result, "page no":page,"limit":limit},200)
            return res
        else:
            return make_response({"message":"NO DATA FOUND"},204)
    
    def user_upload_avatar_model(self, uid, filepath):
        self.cur.execute(f"UPDATE users SET avatar='{filepath}'WHERE id ={uid}")
        if self.cur.rowcount>0:
            return make_response({"message":"FILE_UPLOADED_SUCCESSFULLY"},201)
        else:
            return make_response({"message":"Nothing to update"},202)