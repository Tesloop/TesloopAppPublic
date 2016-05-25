# Application Design

## Booking Flow

### Map Search Scene
Lets the user specify where they are coming from and going to, then shows them the closest possible pickup and dropoff location. <br>
Uses the **PlaceSearchScene** to allow the user to select a place.

#### Place Search Scene
*Receives*
+ Nothing

*Returns*
+ Place Object

*Calls*
+ Callback

### Search Scene
Where the user searches for a specific trip by finding a specific date and time.

*Receives*
+ User Origin
+ User Destination

*Finds*
+ User Pickup

How it works, either:
+ The

#### Date Search Scene
*Receives*
+ PossibleTripDates

*Returns*
+ Date

*Calls*
+ Callback

#### Time Search Scene
*Receives*
+ PossibleTripIds

*Returns*
+ TripId

*Calls*
+ Callback

### Order Scene
*Receives*
+ User Origin
+ User Destination
+ PickupId
+ DropoffId
+ DepartureTripId
+ ReturnTripId

### Pay Scene
