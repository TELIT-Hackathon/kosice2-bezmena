import uvicorn
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlmodel import *

from models import *

app = FastAPI(title="Property")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# admin view
engine = create_engine("sqlite:///DB.sqlite")


@app.get("/")
def homepage(request: Request):
    return "HOME"


@app.get("/property/{property_name}")
def search_property_by_name(property_name: str):
    with Session(engine) as session:
        statement = select(Property).where(Property.title == property_name)
        return session.exec(statement).all()


@app.get("/allproperty")
def all_property():
    with Session(engine) as session:
        statement = select(Property)
        return session.exec(statement).all()


@app.get("/user/{user_name}")
def search_user_by_name(user_name: str):
    with Session(engine) as session:
        statement = select(Users).where(Users.surname == user_name)
        return session.exec(statement).one_or_none()


@app.get("/allusers")
def all_users():
    with Session(engine) as session:
        statement = select(Users)
        return session.exec(statement).all()


@app.get("/dasd")
def all_users():
    with Session(engine) as session:
        # user = Users(surname='ahd')

        statement = select(Users).where(Users.id == 6)
        user = session.exec(statement).one()
        user.name = '12345'
        session.add(user)
        session.commit()
        return 'ok'


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        port=8080,  # port, na ktorom sa aplikácia spustí, default=8000
        host="0.0.0.0",  # bude akceptovať komunikáciu z akejkoľvek IP adresy, default=127.0.0.1
        reload=True,  # v prípade zmeny súboru sa aplikácia automaticky reštartne, default=False
    )
