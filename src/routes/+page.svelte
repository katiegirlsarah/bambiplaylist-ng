<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<PageTransition>
	<h2>Home</h2>

	<p>
		Welcome to the new overhauled version of the
		<a href="https://bambiplaylist.github.io/">original (and now defunct)</a> bambi playlist generator!
	</p>
	<p>
		Together with the help of some contributers (<a href="#contributors">see below</a>) we've
		rebuilt the playlist creator from the ground up and even added in some new features, such as:
	</p>
	<ul>
		<li>User accounts!</li>
		<li>Posting system</li>
		<li>Bambi playlist roulette</li>
		<li>Server side audio streaming (it's faster!)</li>
	</ul>

	<h2>Original 'manifesto'</h2>

	<p>
		Bambi Playlist Creator is a small project that I (Katie, Kat for short) created because I was
		frustrated that I had to go and find specific files from all over the place and then use some
		sketchy audio file splicer to patch them together. The worse thing was that I also had to use up
		TONS of cloud storage if I wanted to share my playlist with anyone and go through the sharing
		permission shenanigans as well. Bambi Playlist Creator solves All these issues with playlist
		sharing, custom and easy ordering!!
	</p>

	<h2>Issues</h2>

	<p>
		If you have <b>any</b> issues or problems with any part of this site please report them to the
		github repository:
		<a href="https://github.com/katiegirlsarah/bambiplaylist-ng/issues"
			>https://github.com/katiegirlsarah/bambiplaylist-ng/issues</a
		>
	</p>

	<h2>Changelog</h2>

	<ul>
		<li>
			<h3>2.0.0-b0</h3>
			<p>Overhaul to initial working state, start advertizing new site</p>
		</li>
	</ul>

	<a id="contributors"><h2>Contributors</h2></a>

	<p>
		If you would like to contribute, please feel free to submit a pull request or and issue!
		<a href="https://github.com/katiegirlsarah/bambiplaylist-ng"
			>https://github.com/katiegirlsarah/bambiplaylist-ng</a
		>
	</p>

	<ul>
		<li>KatieGirl</li>
		<li>dudebot</li>
		<li>indigoxindica</li>
		<li>LockedInBambi</li>
	</ul>
</PageTransition>
