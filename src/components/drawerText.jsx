import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";

export default function DrawerText({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p onClick={() => setIsOpen(!isOpen)}

      className={`cursor-pointer my-[0.5em] ${isOpen ? `orange-underline ` : ''}`}>{title}</p>

      <AnimatePresence initial={false}>
        {isOpen && (
        <motion.div
          layout
          key={title}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div>
            {children}
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
