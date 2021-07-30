# BDO Leaderboards
BDO Leaderboards is a web-based application that allows you to see and compare various achievements of guild members in [Black Desert Online](https://www.naeu.playblackdesert.com).
All data is retrieved from BDO servers in (almost) real time via [Black Desert social REST API](https://gitlab.com/man90/black-desert-social-rest-api).

## Try it out:
[bdo.hemlo.cc/leaderboards](https://bdo.hemlo.cc/leaderboards/)

## Self-hosting

While not a recommended approach for consumer experience, use these instructions if you want to contribute.

### Prerequisites

-   GNU/Linux
-   Node >=v14.0
-   Yarn

### Installation

1. Install and run [BDO-REST-API](https://github.com/octoman90/BDO-REST-API) (It will print out the port to which it listens to, note it down).
2. Clone this repository.
3. From within the main directory of this repository, run `yarn install` and `yarn create-config`.
4. (Optional) If your instance of [BDO-REST-API](https://github.com/octoman90/BDO-REST-API) listens to another port than 8001 or is hosted on a remote machine, edit the `.env` file in the main directory of this repository specifying the correct API address.
5. (Optional) Make a production build using `yarn build`.

### Running

Run `yarn start` from within the main directory of this repository.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
