from datetime import datetime
from models import engine, Order
from sqlalchemy.orm import sessionmaker

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

def check_expired():
    # Get the current time
    current_time = datetime.now()

    # Query orders that have not been fulfilled yet and check if collectionTime has passed
    expired_orders = session.query(Order).filter(
        Order.fufullied == None,  # Order not fulfilled
        Order.collectionTime < current_time.timestamp()  # Compare with current time
    ).all()

    # Process expired orders (e.g., you can mark them as expired or just return them)
    for order in expired_orders:
        print(f"Order ID {order.id} is expired.")

    return expired_orders

# Example usage:
expired_orders = check_expired()
for order in expired_orders:
    print(f"Expired Order ID: {order.id}")
