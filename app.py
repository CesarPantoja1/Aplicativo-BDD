from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("register.html")  


@app.route("/login")
def log():
    return render_template("ejem.html")  



if __name__ == "__main__":
    app.run(debug=True)
