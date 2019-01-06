const gulp = require('gulp')
const server = require('browser-sync')
const less = require('gulp-less')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const minify = require('gulp-csso')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const del = require('del')

gulp.task('style', () => {
	return gulp.src('app/less/**/*.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
				browsers: [
					'last 1 version',
					'last 2 Chrome versions',
					'last 2 Firefox versions',
					'last 2 Opera versions',
					'last 2 edge versions',
				]
			}),
			mqpacker({
				sort: true
			})
		]))

		.pipe(gulp.dest('dist/css'))
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(server.reload({stream: true}))
})

gulp.task('images', () => {
	return gulp.src('dist/img/**/*.{png,jpg,gif}')

		.pipe(imagemin([
			imagemin.optipng({optimizationLever: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest('dist/img'))
})

gulp.task('serve', () => {
	server({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});

	gulp.watch('app/less/**/*.less', gulp.parallel('style'));
	gulp.watch('app/**/*.html').on('change', gulp.series('clean', 'copy', 'style', server.reload))
});

gulp.task('copy', () => {
	return gulp.src([
		'app/img/**',
		'app/js/**',
		'app/*.html'

	], {
		base: 'app'
	})
		.pipe(gulp.dest('dist'))

})

gulp.task('clean', () => {
	return del(['dist/**', '!dist'])
})

gulp.task('build', gulp.series('clean', 'copy', 'style', 'images'))