# BDO Leaderboards
[![license](https://img.shields.io/github/license/octoman90/BDO-Leaderboards)](LICENSE)

BDO Leaderboards is a web-based application that allows you to see and compare various achievements of guild members in [Black Desert Online](https://www.naeu.playblackdesert.com).
All data is retrieved from BDO servers in real time via [BDO REST API](https://github.com/octoman90/BDO-REST-API).

## Try it out:
[https://bdo.hemlo.cc/leaderboards](https://bdo.hemlo.cc/leaderboards/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Local installation prerequisites
- GNU/Linux
- Node >=v14.0
- pnpm (or Yarn, npm etc.)

### Running a local copy
1. Install and run [BDO-REST-API](https://github.com/octoman90/BDO-REST-API) (It will print out the port to which it listens to, note it down)
2. Clone this repository
3. From within the main directory of this repository, run `pnpm install` and `pnpm create-config`
4. (Optional) If your instance of [BDO-REST-API](https://github.com/octoman90/BDO-REST-API) listens to another port than 8001 or is hosted on a remote machine, edit the `.env` file in the main directory of this repository specifying the correct API address
5. Run `pnpm dev` from within the main directory of this repository.
