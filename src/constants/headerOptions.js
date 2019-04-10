import PAGEKEYS from "./pageKeys";
const HEADEROPTIONS={};
HEADEROPTIONS[PAGEKEYS["HOME"]]={
    Icon:"fa fa-home",
    Title:"Home",
    Search:false,
    Filter:false
};
HEADEROPTIONS[PAGEKEYS["GOALS"]]={
    Icon:"fa fa-home",
    Title:"Goals",
    Search:true,
    Filter:true
};
HEADEROPTIONS[PAGEKEYS["HABITS"]]={
    Icon:"fa fa-home",
    Title:"Habits",
    Search:true
};
HEADEROPTIONS[PAGEKEYS["TASKS"]]={
    Icon:"fa fa-home",
    Title:"Tasks",
    Search:true
};

export default HEADEROPTIONS;