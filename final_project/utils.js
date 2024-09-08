function slugify(str) {
	return str.toLowerCase().replace(/\s+/, "-");
}

module.exports = {
	slugify,
};
