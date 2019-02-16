const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const resourceOpts = {
    timeoutSeconds: 510,
    memory: '1GB'
};
exports.redcont = functions.runWith(resourceOpts).https.onRequest((request, response) => {
    let db = admin.database();
    let curtime = new Date();
    let limit = curtime.getTime() - 1000;
    let f = 0, r = 0, b = 0, l = 0;
    let counts = {
        f: 0, b: 0, r: 0, l: 0
    };
    let rootRef = db.ref('redbot');
    rootRef.on("value", (snap) => {
        curtime = new Date();
        limit = curtime.getTime() - 1000;
        snap.forEach((element) => {
            if (element.val().time > limit) {
                if (element.val().direction === 'f') {
                    f++;
                    counts.f++;
                }
                else if (element.val().direction === 'b') {
                    b++;
                    counts.b++;
                }
                else if (element.val().direction === 'r') {
                    r++;
                    counts.r++;
                }
                else {
                    l++;
                    counts.l++;
                }
            }
        });
        let fixed = false;
        for (var dir in counts) {
            if (counts[dir] === Math.max(f, b, l, r) && !fixed) {
                counts[dir] = 1;
                fixed = true;
            }
            else counts[dir] = 0;
        }
        db.ref('redcontrol').set(counts);
        f = 0, b = 0, r = 0, l = 0;
        counts.f = 0, counts.b = 0, counts.r = 0, counts.l = 0;
        //response.send(counts.f.toString()); 
    });
});

exports.bluecont = functions.runWith(resourceOpts).https.onRequest((request, response) => {
    let db = admin.database();
    let curtime = new Date();
    let limit = curtime.getTime() - 1000;
    let f = 0, r = 0, b = 0, l = 0;
    let counts = {
        f: 0, b: 0, r: 0, l: 0
    };
    let rootRef = db.ref('bluebot');
    rootRef.on("value", (snap) => {
        curtime = new Date();
        limit = curtime.getTime() - 1000;
        snap.forEach((element) => {
            if (element.val().time > limit) {
                if (element.val().direction === 'f') {
                    f++;
                    counts.f++;
                }
                else if (element.val().direction === 'b') {
                    b++;
                    counts.b++;
                }
                else if (element.val().direction === 'r') {
                    r++;
                    counts.r++;
                }
                else {
                    l++;
                    counts.l++;
                }
            }
        });
        let fixed = false;
        for (var dir in counts) {
            if (counts[dir] === Math.max(f, b, l, r) && !fixed) {
                counts[dir] = 1;
                fixed = true;
            }
            else counts[dir] = 0;
        }
        db.ref('bluecontrol').set(counts);
        f = 0, b = 0, r = 0, l = 0;
        counts.f = 0, counts.b = 0, counts.r = 0, counts.l = 0;
        //response.send(counts.f.toString()); 
    });
});