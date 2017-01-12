# Star Killer

While it's potentially important to use the latest version of dependencies when you begin a project, it's possible that using the * version in your package.json file may create issues for developers working on your project a year from now if those dependencies introduce breaking changes. Star Killer is an easy and simple way to remove * from your package.json without needing to manually replace * with the correct version number.

# Install
Star Killer is a simple node package. Install globally:

`npm install -g star-killer`

# Usage

1.) Validate that you have run `npm install` at least once inside your project that contains your package.json.
2.) Validate that you have a `devDependencies` and `dependencies` inside your package.json.
3.) Validate that each of those two things have at least one key and value.
4.) Lastly, in any project where you want to kill star dependencies, navigate in the command line to the directory that contains your package.json and run `star-killer`. That's it. You're done.
