# Color :sparkles:
Color Explorer for Color

## Projects running on mainnets
[Color Explorer with Color](http://ec2-3-15-152-52.us-east-2.compute.amazonaws.com:3000/)


## How to run Color

1. Copy `settings.json.default` to `settings.json`.
2. Update the RPC and LCD URLs.
3. Update Bech32 address prefixes.
4. Update genesis file location.

### Run in local

```
meteor npm install
meteor update
meteor --settings settings.json
```

### Run in production

```
./build.sh
```

It will create a packaged Node JS tarball at `../output`. Deploy that packaged Node JS project with process manager like [forever](https://www.npmjs.com/package/forever) or [Phusion Passenger](https://www.phusionpassenger.com/library/walkthroughs/basics/nodejs/fundamental_concepts.html).

---
## Donations :pray:

Color is always free and open. Anyone can use to monitor available Color hub or zones, or port to your own chain built with Color SDK. We welcome any supports to help us improve this project.
You may support color paltform by working with our team or partners.
