function slugify(str) {
	return str.toLowerCase().replace(/\s+/g, "-");
}

module.exports = {
	slugify,
};
