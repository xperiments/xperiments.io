var cabinjsAdmin = require('cabinjs-admin')(__dirname);
module.exports = function (grunt)
{
	grunt.initConfig(
		{
			pages:
			{
				posts:
				{
					src: 'posts',
					dest: 'dist',
					layout: 'src/layouts/post.ejs',
					url: 'posts/:title/',
					options:
					{
						pageSrc: 'src/pages',
						data:
						{
							baseUrl: '/'
						},
						pagination:
						{
							postsPerPage: 1,
							listPage: 'src/pages/index.ejs'
						}
					}
				},
				articles:
				{
					src: 'pages',
					dest: 'dist/pages/',
					layout: 'src/layouts/post.ejs',
					url: ':title/',
					options:
					{
						data:
						{
							baseUrl: '/pages/'
						},
						pagination:
						{
							postsPerPage: 0,
							listPage: 'src/pages/index.ejs'
						}
					}
				},
				options:
				{
					markedOptions:function(marked)
					{

						var renderer = new marked.Renderer();
						renderer.code = function( code, lang )
						{
							code = code.split('\n').join('\r\n');
							lang = lang || "undefined";
							var knownLangs = [
								"markup",
								"css",
								"clike",
								"javascript",
								"java",
								"php",
								"coffeescript",
								"scss",
								"bash",
								"c",
								"cpp",
								"typescript",
								"csharp"
							];


							lang = knownLangs.indexOf(lang)==-1 ? "javascript": lang;

							var button ="";
							if( lang=="typescript")
							{
								button = '<div xp-code-play="'+lang+'"><pre>'+code+'</pre></div>';
							}

							return ('<pre><code class="language-'+lang+'">'+code+'</code></pre>')+button;

						};

						return {
							renderer:renderer,

							highlight: function (code)
							{
								console.log('D',code)
								return code;
							}
						}
					}
				}
			},
			compass:
			{
				dist:
				{
					options:
					{
						sassDir: 'src/styles',
						cssDir: 'dist/styles'
					}
				}
			},
			copy:
			{
				dist:
				{
					files: [
						{
							expand: true,
							cwd: 'src',
							dest: 'dist',
							src: [
								'images/**',
								'scripts/**',
								'styles/**.css',
								'styles/fonts/**',
								'styles/**/**',
								'CNAME'
							]
						}]
				}
			},
			watch:
			{
				pages:
				{
					files: [
						'posts/**',
						'src/layouts/**',
						'src/pages/**'
					],
					tasks: ['pages']
				},
				articles:
				{
					files: [
						'articles/**',
						'src/layouts/**'
					],
					tasks: ['pages:articles']
				},
				copy:
				{
					files: [
						'src/images/**',
						'src/scripts/**',
						'src/styles/**',
						'src/styles/fonts/**'
					],
					tasks: ['copy']
				},
				dist:
				{
					files: ['dist/**'],
					options:
					{
						livereload: true
					}
				}
			},
			connect:
			{
				dist:
				{
					options:
					{
						port: 5455,
						hostname: '0.0.0.0',
						base: ['.tmp','dist'],
						livereload: true,
						middleware:cabinjsAdmin
					}
				}
			},
			open:
			{
				dist:
				{
					path: 'http://localhost:5455'
				}
			},
			clean:
			{
				dist: 'dist'
			},
			'gh-pages':
			{
				options:
				{
					base: 'dist',
					branch: 'master',
					repo: 'https://github.com/xperiments/xperiments.github.io.git'
				},
				src: ['**']
			}
		});
	grunt.registerTask('build', [
		'clean',
		'pages',
		'compass',
		'copy'
	]);
	grunt.registerTask('deploy', ['build', 'gh-pages']);
	grunt.registerTask('server', [
		'build',
		'connect',
		'open',
		'watch'
	]);
	grunt.registerTask('default', 'server');
	require('load-grunt-tasks')(grunt);
};


