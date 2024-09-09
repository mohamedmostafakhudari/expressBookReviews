function slugify(str) {
	return str.toLowerCase().replace(/\s+/g, "-");
}
async function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

module.exports = {
	slugify,
	delay,
};
