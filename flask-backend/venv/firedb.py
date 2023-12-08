import pyrebase

# This api key doesn't really exposed anything based on how firebase is developed
config = {
  "apiKey": "AIzaSyAA9BqT2s9cE8ExpBeXNhb7rfexg2i-rNw",
  "authDomain": "languagelogin-53aef.firebaseapp.com",
  "databaseURL": "https://languagelogin-53aef-default-rtdb.firebaseio.com",
  "projectId": "languagelogin-53aef",
  "storageBucket": "languagelogin-53aef.appspot.com",
  "messagingSenderId": "393887629758",
  "appId": "1:393887629758:web:adc0ece906532bdead39ef",
  "measurementId": "G-WQ7Z1QYJ8J"
  
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
def addUser(uid,email):
    new_user = [""]
    # Check if the user already exists
    db.child(uid).set(new_user)

def replaceData(user, curr_data):
    db.child(user).set(curr_data)

def userFinder(user):
    users = db.child("users").get()
    users = users.val()
    if users != None:
        users = users.keys()
        if (user not in users):
            return False
        else:
            return True
    else:
        return False
    
def retrieveData(user):
    current_user_data = db.child(user).get()
    current_user_data = current_user_data.val()
    return current_user_data