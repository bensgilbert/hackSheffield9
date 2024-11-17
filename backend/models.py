from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from sqlalchemy import create_engine, select

engine = create_engine("sqlite:///neighboury.db", echo=True)


class Base(DeclarativeBase):
    pass


class Account(Base):
    __tablename__ = "account"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)


class Order(Base):
    __tablename__ = "order"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True)
    message: Mapped[str] = mapped_column(nullable=False)
    account_id: Mapped[int] = mapped_column(nullable=False)
    lat: Mapped[str] = mapped_column(nullable=False)
    lng: Mapped[str] = mapped_column(nullable=False)
    address: Mapped[str] = mapped_column(nullable=False)
    collectionTime: Mapped[str] = mapped_column(nullable=False)
    fulfilled: Mapped[int] = mapped_column(nullable=True)


class OrderItem(Base):
    __tablename__ = "order_item"

    item_id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(primary_key=False)
    name: Mapped[str] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)


Base.metadata.create_all(engine)

## Order
# Fufilled
# List of items
# Message
# Username
# lat/lng
# timeframe (start/end)

## Item
# Name
# Quantity