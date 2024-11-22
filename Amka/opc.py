from turtle import *   
import random
# car class define
class Car : 
    speed = 0
    color = ""
    model = ""
    turtle = None

    def __init__(self, speed, color, model, fname) : 
        self.speed = speed
        self.color = color
        self.model = model
        self.turtle = Turtle()
        self.turtle.shape(fname)

    def drive(self, distance) : 
        self.turtle.forward(distance)

    def left_turn(self, degree) :
        self.turtle.left(degree)

register_shape('car1.gif')
register_shape('car2.gif')

listCar = []
i = 0
for _ in range(10) :
    if i % 2 == 0 :
        car = Car(random.randint(1, 10), "red", "SONATA", "car2.gif")
    else :
        car = Car(random.randint(1, 10), "blue", "SONATA", "car1.gif")
    listCar.append(car)
    i += 2
for _ in range(10) :
    for car in listCar : 
        car.drive(random.randint(50, 150))
        car.left_turn(random.choice(0, 90, 180, 270))

done()
