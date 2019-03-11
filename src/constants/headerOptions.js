import PAGEKEYS from "./pageKeys";
const HEADEROPTIONS={};
HEADEROPTIONS[PAGEKEYS["HOME"]]={
    Icon:"fa fa-home",
    Title:"Home",
    Search:false
};
HEADEROPTIONS[PAGEKEYS["GOALS"]]={
    Icon:"fa fa-home",
    Title:"Goals",
    Search:true
};
HEADEROPTIONS[PAGEKEYS["HABITS"]]={
    Icon:"fa fa-home",
    Title:"Habits",
    Search:true
};

export default HEADEROPTIONS;