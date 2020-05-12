
# Frugal Fashion
---

Name: Nicholas Ruei 

Date: 5/11/2020

Project Topic: Crowdsourced clothing deal site 

URL: https://nruei-cmsc389k.herokuapp.com/

---

### 0. From Midterm: Search 

Search Field: `name` 

### 1. MongoDB Schema

reviewSchema
- `Field 1`: Rating `Type: Number`
- `Field 2`: Comment `Type: String`

Deals
- `Field 1`: Name `Type: String`
- `Field 2`: Price `Type: Number`
- `Field 3`: Tags `Type: [String]`
- `Field 4`: Store `Type: String`
- `Field 5`: Location `Type: String`
- `Field 6`: Reviews `Type: [reviewSchema]`


Schema: 
```javascript

{
   rating: Number,
   comment: String
}


{
   name: String,
   price: Number,
   Tags: [String],
   Store: String,
   Location: String,
   Reviews: [reviewSchema]

}
```

### 2. Live Updates
  Sockets are utilized in create.handlebars. As users submit input into the form, the latest posts (ordered by recency) are displayed below and live updated. 


  HTML form route: `/create`


### 3. View Data/Navigation Pages

Navigation Filters
1. Choose random price over 50, display all items that meet criteria -> GET endpoint route: `/random`
2. For Men -> GET endpoint route: `/men`
3. For Women -> GET endpoint route: `/women`
4. Location in Maryland ->  GET endpoint route: `/maryland`
5. Price Lower than 50 -> GET endpoint route: `/budget`

Feedback Page: 
GET endpoint route: `/feedback`

About Page: 
GET endpoint route: `/about`

### 4. View Data
In addition to the 7 GET endpoints in section 3. 

POST endpoint route: `/feedback`
POST endpoint route: `/create`

DELETE endpoint route: `/deleteID/:id`
DELETE endpoint route: `/deleteLocation/:location` 

### 5. External Module

I created a date module, called data-util.js. In `/feedback`, I utilize it to timestamp the moment that feedback is submitted by the user. 

### 6. NPM Packages 

1. random.js (Used to generate the numbers in the `/random` page)
2. normalize.css (Increase uniformity in CSS and to help style the search bar)

### 7. Readme 
Can be found at README.md

