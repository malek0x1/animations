export function AnimatedHeadline({ 
  text, 
  className = '', 
  wordDelay = 0.15, 
  wordDuration = 0.6 
}: {
  text: string
  className?: string
  wordDelay?: number
  wordDuration?: number
}) {
  const lines = text.split('\n')
  let wordIndex = 0

  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {line.split(' ').map((word, index) => {
            const currentWordIndex = wordIndex++
            return (
              <div key={index} className="inline-block overflow-hidden align-bottom mr-2 md:mr-3 lg:mr-4">
                <div
                  className="inline-block animate-fade-up"
                  style={{
                    animationDelay: `${currentWordIndex * wordDelay}s`,
                    animationDuration: `${wordDuration}s`,
                    animationFillMode: 'forwards',
                    opacity: 0,
                  }}
                >
                  {word}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </h1>
  )
}