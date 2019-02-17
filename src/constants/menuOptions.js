import * as ROUTES from "./routes";
const MENUOPTIONS={};
MENUOPTIONS[ROUTES.HOME]={
    Icon:"fa fa-home",
    Title:"Home"
};

Object.keys(ROUTES).forEach(function (item) {
	console.log(item); // key
	// console.log(lunch[item]); // value
});
export default MENUOPTIONS;