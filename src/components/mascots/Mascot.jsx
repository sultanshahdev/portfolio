import Pixel from './PixelMascot.jsx';
import Daemon from './DaemonMascot.jsx';
import Relay from './RelayMascot.jsx';
import Keeper from './KeeperMascot.jsx';
import Sentinel from './SentinelMascot.jsx';
import Archie from './ArchieMascot.jsx';
import Scout from './ScoutMascot.jsx';
import Forge from './ForgeMascot.jsx';

const drawings = { pixel: Pixel, daemon: Daemon, relay: Relay, keeper: Keeper, sentinel: Sentinel, archie: Archie, scout: Scout, forge: Forge };
export default function Mascot({ character, ...props }) {
  const Drawing = drawings[character];
  return Drawing ? <Drawing {...props} /> : null;
}
