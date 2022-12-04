from sqladmin import ModelView
from sqlmodel import SQLModel, Field


class Property(SQLModel, table=True):
    title: str
    id: int | None = Field(default=None, primary_key=True)
    street: str
    street_number: int
    floor: int
    longitude: int
    latitude: int
    number_of_rooms: int
    flag_migrants: int
    flag_low_budgets: int
    flag_pensioners: int
    flag_newlyweds: int
    flag_handicaps: int
    flag_orphanages: int
    flag_single_parents: int
    flag_regulars: int


class Users(SQLModel, table=True):
    # __tablename__ = "Property"
    name: int
    surname: str
    id: int | None = Field(default=None, primary_key=True)
    age: str
    mail: int
    flag_migrants: int
    flag_low_budgets: int
    flag_pensioners: int
    flag_newlyweds: int
    flag_handicaps: int
    flag_orphanages: int
    flag_single_parents: int
    flag_regulars: int


class PropertyAdmin(ModelView, model=Property):
    column_searchable_list = [Property.title]
    column_sortable_list = [Property.title, Property.id]
    column_list = [
        Property.title,
        Property.id,
        Property.street,
        Property.street_number,
        Property.longitude,
        Property.latitude,
        Property.number_of_rooms,
        Property.flag_migrants,
        Property.flag_low_budgets,
        Property.flag_pensioners,
        Property.flag_newlyweds,
        Property.flag_handicaps,
        Property.flag_orphanages,
        Property.flag_single_parents,
        Property.flag_regulars
    ]

class UsersAdmin(ModelView, model=Users):
    column_searchable_list = [Users.name]
    column_sortable_list = [Users.name]
    column_list = [
        Users.name,
        Users.surname,
        Users.flag_migrants,
        Users.flag_low_budgets,
        Users.flag_pensioners,
        Users.flag_newlyweds,
        Users.flag_handicaps,
        Users.flag_orphanages,
        Users.flag_single_parents,
        Users.flag_regulars
    ]
