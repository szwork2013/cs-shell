var path = require("path");
var gulp = require("gulp");
var debug = require("gulp-debug");

var config = {
	src: "./../cs-customers/components",
	filter: "/*/**/*.*",
	dest: "./components"
}

gulp.task("default", function() {
	var source = path.join(config.src, config.filter);	
	return gulp.src(source, {read: true})
		// .on("end", done)
		.pipe(debug({title: "copying:"}))		
		.pipe(gulp.dest(config.dest));
});
