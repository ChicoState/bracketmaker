// import {addTournament} from "../src/firebase";
// import {addDoc} from "firebase/firestore";

const assert = require("assert");
const firebaseTestin = require("@firebase/testing");
const myFunctions = require("firebase/firestore");
const myAuth = require("firebase/auth");
const admin = require("firebase-admin");

const MY_PROJECT_ID = "bracketmaker-db3ef";

describe("BracketMaker", ()=>{
    it("smokeTest", ()=>{
        assert.equal(4,4);
    });
    it("readingData", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("Tournament").doc("World Champion");
        await firebaseTestin.assertSucceeds(testDoc.get());
    })

    it("writingData", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const Torname = "World Championship"
        const testDoc = db.collection("Tournament").doc(Torname);
        await firebaseTestin.assertSucceeds(testDoc.set({name:Torname, type:"Single Elimination", manager: "Sam", numTeams: 4}));
    });
    it("modifyingData", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const Torname = "Semi-Final"
        const testDoc = db.collection("Tournament").doc(Torname);
        await testDoc.set({name:Torname, type:"Single Elimination", manager: "Sam", numTeams: 4});
        await firebaseTestin.assertSucceeds(testDoc.set({name:Torname, type:"Single Elimination", manager: "Alex", numTeams: 4}));
    });
    it("addingStringToNumber", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const Torname = "Quater-Final"
        const testDoc = db.collection("Tournament").doc(Torname);
        await testDoc.set({name:Torname, type:"Single Elimination", manager: "Sam", numTeams: 4});
        await firebaseTestin.assertSucceeds(testDoc.set({name:Torname, type:"Single Elimination", manager: "Alex", numTeams: "4"}));
    });
    it("lessFieldsGiven", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const Torname = "Qualifier"
        const testDoc = db.collection("Tournament").doc(Torname);
        await testDoc.set({name:Torname, type:"Single Elimination", manager: "Sam", numTeams: 4});
        await firebaseTestin.assertSucceeds(testDoc.set({name:Torname, type:"Single Elimination", manager: "Alex"}));
    });
    it("Adding In collection Inside Collection", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const email = "abc@gmail.com"
        const testDoc = db.collection("User").doc(email);
        await testDoc.set({email:email, uname:"ABC", name: "Abc"});
        const TourName="Final"
        const testDoc2 = testDoc.collection("Tournament").doc(TourName)
        await firebaseTestin.assertSucceeds(testDoc2.set({name:TourName, type:"Single Elimination", manager: "Alex"}));
    })
    it("Getting from collection Inside Collection", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const email = "abc@gmail.com"
        const testDoc = db.collection("User").doc(email);
        await testDoc.set({email:email, uname:"ABC", name: "Abc"});
        const TourName="Final"
        const testDoc2 = testDoc.collection("Tournament").doc(TourName)
        await (testDoc2.set({name:TourName, type:"Single Elimination", manager: "Alex"}));
        await firebaseTestin.assertSucceeds(testDoc2.get());
    })
    it("Modifying inside collection of Collection", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const email = "def@gmail.com"
        const testDoc = db.collection("User").doc(email);
        await testDoc.set({email:email, uname:"DEF", name: "Def"});
        const TourName="Final"
        const testDoc2 = testDoc.collection("Tournament").doc(TourName)
        await (testDoc2.set({name:TourName, type:"Single Elimination", manager: "Alex"}));
        await firebaseTestin.assertSucceeds(testDoc2.set({name:TourName, type:"Double Elimination", manager: "Sam"}));
    });
    it("authentication Invalid email", async () => {
        const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const authe = admin.initializeApp({projectId: MY_PROJECT_ID}).auth();
        const email = "abcdef";
        const password = "abcd1234";
        await firebaseTestin.assertFails(myAuth.createUserWithEmailAndPassword(authe, email, password));
    });
    // it("authentication small password", async () => {
    //     const db = firebaseTestin.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
    //     const authe = admin.initializeApp({projectId: MY_PROJECT_ID}).auth();
    //     const email = "abc@gmail.com";
    //     const password = "abcd";
    //     await firebaseTestin.assertFails(myAuth.createUserWithEmailAndPassword(authe, email, password));
    // });
})