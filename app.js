// console.log(firebase);

document.querySelector("#submit").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let color = document.querySelector("#favcolor").value;

  let user = {
    name: name,
    age: parseInt(age),
    color: color,
  };

  //   console.log(user);

  // save the user into the DB
  db.collection("mypeople")
    .add(user)
    .then(() => {
      alert("New user added!");
      show_people();
    });
});

// show people stored in our DB

function show_people() {
  // data retrieval
  db.collection("mypeople")
    .get()
    .then((mydata) => {
      let docs = mydata.docs;

      let html = ``;
      //   loop though the docs array
      docs.forEach((d) => {
        // console.log(d.data().name);
        html += `<p class="p-3">${d.data().name} is ${
          d.data().age
        } years old. <span class="subtitle m-4">${d.id}</span> 
        <button class="button is-danger is-pulled-right" onclick="del_doc('${
          d.id
        }')">X</button>
        
        </p>`;
      });
      //   console.log(html);

      document.querySelector("#all_people").innerHTML = html;
    });
}

// call the function
show_people();

// delete the user test
// delete()

// db.collection("mypeople")
//   .doc("F4DmmZabc1234")
//   .delete()
//   .then(() => {
//     alert("user deleted");
//   });

function del_doc(docid) {
  db.collection("mypeople")
    .doc(docid)
    .delete()
    .then(() => {
      alert("user deleted!");
      show_people();
    });
}

// -------------------------------------- LOOPING THROUGH DOCS FOR INFO --------------------------------------

// .where(field, operator, value) helps filter info

// // show all people whose name is sally

// db.collection("mypeople")
//   .where("name", "==", "sally")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // show all people whose name is sally and red is their favorite color

// db.collection("mypeople")
//   .where("name", "==", "sally")
//   .where("color", "==", "red")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // show all people whose name is sally and older than 25

// db.collection("mypeople")
//   .where("name", "==", "sally")
//   .where("age", ">=", 25)
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// update()

// -------------------------------------- UPDATING EXISTING DOCS --------------------------------------

// // update doc ID 3OsAQZMeNfjkGBJ5iGbG to change sally's age to 34
// // age field is a number--makes it easy

// db.collection("mypeople").doc("3OsAQZMeNfjkGBJ5iGbG").update({
//   age: 34,
// });

// // update favorite color to black

// db.collection("mypeople").doc("3OsAQZMeNfjkGBJ5iGbG").update({
//   color: "black",
// });

// // add peter and kristen as sally's friends

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     friends: ["peter", "kristen"],
//   });

// // add is424 as a course sally completed

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     courses: ["is424"],
//   });

// -------------------------------------- EDITING EXISTING ARRAYS --------------------------------------

// arrayUnion() => adds elements to a field of type array

// // sally completed is 365, update the courses field--courses array already exists and want to add to it

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     courses: firebase.firestore.FieldValue.arrayUnion("is365"),
//   });

// // sally also completed is422

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     courses: firebase.firestore.FieldValue.arrayUnion("is422"),
//   });

// arrayRemove() => remove elements from a field of type array

// // remove is422 from what sally has completed

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     courses: firebase.firestore.FieldValue.arrayRemove("is422"),
//   });

// -------------------------------------- SEARCHING WITHIN ARRAYS --------------------------------------

// set-up code--giving more docs courses

// db.collection("mypeople")
//   .doc("jdBtn8KaFPyFNUfazv3t")
//   .update({
//     courses: ["is365"],
//   });

// db.collection("mypeople")
//   .doc("xoKoeUAIDoYNYBrOlaAp")
//   .update({
//     courses: ["is365"],
//   });

// db.collection("mypeople")
//   .doc("xoKoeUAIDoYNYBrOlaAp")
//   .update({
//     courses: firebase.firestore.FieldValue.arrayUnion("is424"),
//   });

// we want to know which people completed is424
// use where(field(array name), "array-contains", value)
// in this case: where("courses","array-contains","is424")

// db.collection("mypeople")
//   .where("courses", "array-contains", "is424")
//   // can still add more where clauses like before to further filter the retrieval
//   .where("age", "==", 34)
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // show the names of those who completed either is424, is365, OR is400 -- use array-contains-any

// db.collection("mypeople")
//   .where("courses", "array-contains-any", ["is424", "is365", "is400"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// in & not-in

// // show all users with the name sally (consider uppercase)

// db.collection("mypeople")
//   .where("name", "in", ["sally", "Sally", "SALLY"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // show all users with the name sally or mike (consider uppercase)

// db.collection("mypeople")
//   .where("name", "in", ["sally", "Sally", "SALLY", "mike", "Mike", "MIKE"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // show all users other than sally

// db.collection("mypeople")
//   .where("name", "not-in", ["sally", "Sally", "SALLY"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // if no results
//     if (mydocs.length == 0) {
//       console.log("no data returned");
//       return;
//     }
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // sally has soccer as her favorite sport, pizza as her favorite food, madison as her favorite city, and 10 as her favorite number

// db.collection("mypeople")
//   .doc("3OsAQZMeNfjkGBJ5iGbG")
//   .update({
//     favorites: {
//       sport: "soccer",
//       city: "Madison",
//       food: "pizza",
//       number: 10,
//     },
//   });

// update sally's favoites so that 7 is her favorite number
// sally's other faovites will remain the same

// db.collection("mypeople").doc("3OsAQZMeNfjkGBJ5iGbG").update({
//   "favorites.number": 7,
// });

// -------------------------------------- ACTIVITY WORK --------------------------------------
// -------------- TASK 1: CREATING/STORING DATA --------------
// // adding teams to collection
// let rm = {
//   name: "real madrid",
//   city: "madrid",
//   country: "spain",
//   top_scorers: ["ronaldo", "benzema", "hazard"],
//   fans_count: 798,
// };

// // add to the database
// db.collection("teams").add(rm);

// let barc = {
//   name: "barcelona",
//   city: "barcelona",
//   country: "spain",
//   top_scorers: ["messi", "suarez", "puyol"],
//   fans_count: 738,
// };

// // add to the database
// db.collection("teams").add(barc);

// let mu = {
//   name: "manchester united",
//   city: "manchester",
//   country: "england",
//   top_scorers: ["cantona", "rooney", "ronaldo"],
//   fans_count: 755,
// };

// // add to the database
// db.collection("teams").add(mu);

// let mc = {
//   name: "manchester city",
//   city: "manchester",
//   country: "england",
//   top_scorers: ["sterling", "aguero", "haaland"],
//   fans_count: 537,
// };

// // add to the database
// db.collection("teams").add(mc);

// let bnt = {
//   name: "brazil national team",
//   city: "N/A",
//   country: "brazil",
//   top_scorers: ["ronaldinho", "cafu", "beheto"],
//   fans_count: 950,
// };

// // add to the database
// db.collection("teams").add(bnt);

// let ant = {
//   name: "argentina national team",
//   city: "N/A",
//   country: "argentina",
//   top_scorers: ["messi", "batistuta", "maradona"],
//   fans_count: 888,
// };

// // add to the database
// db.collection("teams").add(ant);

// let am = {
//   name: "atletico madrid",
//   city: "madrid",
//   country: "spain",
//   top_scorers: ["aragones", "griezman", "torez"],
//   fans_count: 400,
// };

// // add to the database
// db.collection("teams").add(am);

// -------------- TASK 2: QUERYING DATA --------------
// define function for putting on site
function showanswer(answer, id) {
  html = `<p class="p-3 is-size-6"> ${answer} </p>`;
  document.querySelector(id).innerHTML += html;
}

// 1. Show all teams in Spain
db.collection("teams")
  .where("country", "==", "spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question1");
    });
  });

// 2. Show all teams in Madrid, Spain
db.collection("teams")
  .where("city", "==", "madrid")
  .where("country", "==", "spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question2");
    });
  });

// 3. Show all national teams (Remember there might be new national teams added later)
db.collection("teams")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      const teamName = d.data().name;
      // Check if the name includes "national team"
      if (teamName.toLowerCase().includes("national team")) {
        showanswer(teamName, "#question3");
      }
    });
  });

// 4. Show all teams that are not in Spain
db.collection("teams")
  .where("country", "!=", "spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question4");
    });
  });

// 5. Show all teams that are not in Spain or England
db.collection("teams")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      const teamCountry = d.data().country.toLowerCase();
      // Filter out teams from Spain and England
      if (teamCountry != "spain" && teamCountry != "england") {
        showanswer(d.data().name, "#question5");
      }
    });
  });

// 6. Show all teams in Spain with more than 700M fans
db.collection("teams")
  .where("country", "==", "spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      if (d.data().fans_count >= 700) {
        showanswer(d.data().name, "#question6");
      }
    });
  });

// 7. Show all teams with a number of fans in the range of 500M and 600M
db.collection("teams")
  .where("fans_count", ">=", 500)
  .where("fans_count", "<=", 600)
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question7");
    });
  });

// 8. Show all teams where Ronaldo is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains", "ronaldo")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question8");
    });
  });

// 9. Show all teams where Ronaldo, Maradona, or Messi is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains-any", ["ronaldo", "messi", "maradona"])
  .get()
  .then((data) => {
    let mydocs = data.docs;
    // if no results
    if (mydocs.length == 0) {
      console.log("no data returned");
      return;
    }
    mydocs.forEach((d) => {
      showanswer(d.data().name, "#question9");
    });
  });

// -------------- TASK 3: UPDATING DATA --------------
// a] Updating Existing Data

// // real madrid name: change to real madrid fc
// db.collection("teams").doc("2BSQ7M4Y366jCfRubj4l").update({
//   name: "real madrid fc",
// });

// // real madrid fans_count: update to 811
// db.collection("teams").doc("2BSQ7M4Y366jCfRubj4l").update({
//   fans_count: 811,
// });

// // real madrid top_scorers: remove hazard and add crispo

// // remove hazard
// db.collection("teams")
//   .doc("2BSQ7M4Y366jCfRubj4l")
//   .update({
//     top_scorers: firebase.firestore.FieldValue.arrayRemove("hazard"),
//   });

// // add crispo
// db.collection("teams")
//   .doc("2BSQ7M4Y366jCfRubj4l")
//   .update({
//     top_scorers: firebase.firestore.FieldValue.arrayUnion("crispo"),
//   });

// // barcelona name: change to fc barcelona
// db.collection("teams").doc("PSwoMPwwUFCJbiO8VDOk").update({
//   name: "fc barcelona",
// });

// // barcelona fans_count: update to 747
// db.collection("teams").doc("PSwoMPwwUFCJbiO8VDOk").update({
//   fans_count: 747,
// });

// // barcelona top_scorers: remove puyol and add deco
// // remove puyol
// db.collection("teams")
//   .doc("PSwoMPwwUFCJbiO8VDOk")
//   .update({
//     top_scorers: firebase.firestore.FieldValue.arrayRemove("puyol"),
//   });

// // add deco
// db.collection("teams")
//   .doc("PSwoMPwwUFCJbiO8VDOk")
//   .update({
//     top_scorers: firebase.firestore.FieldValue.arrayUnion("deco"),
//   });

// b] Adding New Fields to Existing Documents
// original jersey colors data
// // real madrid: white(home), black(away)
// db.collection("teams")
//   .doc("2BSQ7M4Y366jCfRubj4l")
//   .update({
//     colors: {
//       home: "white",
//       away: "black",
//     },
//   });

// // barcelona: red(home), gold(away)
// db.collection("teams")
//   .doc("PSwoMPwwUFCJbiO8VDOk")
//   .update({
//     colors: {
//       home: "red",
//       away: "gold",
//     },
//   });

// update jersey colors data
// // real madrid: purple(away)
// db.collection("teams").doc("2BSQ7M4Y366jCfRubj4l").update({
//   "colors.away": "purple",
// });

// // barcelona: pink(away)
// db.collection("teams").doc("PSwoMPwwUFCJbiO8VDOk").update({
//   "colors.away": "pink",
// });
