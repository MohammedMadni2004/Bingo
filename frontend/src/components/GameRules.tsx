import { motion } from "framer-motion";

type GameRulesProps = {
  compact?: boolean;
  className?: string;
};

const GameRules: React.FC<GameRulesProps> = ({ compact = false, className = "" }) => {
  if (compact) {
    return (
      <motion.div
        className={`rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left text-sm text-white/95 max-w-md ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="font-bold text-white mb-2 text-base">How to play</h3>
        <p className="mb-2">
          <strong>Call order:</strong> You call a number → opponent marks that number, then calls theirs → you mark theirs, then call yours. Repeat!
        </p>
        <p>
          <strong>Win:</strong> Get 5 in a line (one full row, column, or diagonal). First to do it wins.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-left text-white/95 max-w-lg space-y-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="font-bold text-xl text-white mb-3">How to play</h3>

      <div>
        <h4 className="font-semibold text-white/95 mb-1">Call order (take turns)</h4>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          <li>You call a number from your grid.</li>
          <li>Your opponent must <strong>first mark that same number</strong> on their grid, then call one of their numbers.</li>
          <li>You must <strong>first mark the number they called</strong>, then call your next number.</li>
          <li>Keep alternating: call → they mark & call → you mark & call → …</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-white/95 mb-1">Winning (5 in a line)</h4>
        <p className="text-sm sm:text-base">
          A &quot;line&quot; is 5 marked cells in a row:
        </p>
        <ul className="list-disc list-inside space-y-0.5 text-sm sm:text-base mt-1">
          <li><strong>Row</strong> — any horizontal line (all 5 in one row)</li>
          <li><strong>Column</strong> — any vertical line (all 5 in one column)</li>
          <li><strong>Diagonal</strong> — either of the two diagonals</li>
        </ul>
        <p className="mt-2 text-sm sm:text-base">
          First player to complete any one full line wins. Click <strong>BINGO WINNER</strong> when you have a line!
        </p>
      </div>
    </motion.div>
  );
};

export default GameRules;
