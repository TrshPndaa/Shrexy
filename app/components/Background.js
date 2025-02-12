export default function Background() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-40 w-full h-100vh">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-pink-200 to-purple-500 animate-float"
          style={{
            width: `${Math.random() * 8 + 4}rem`,
            height: `${Math.random() * 8 + 4}rem`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${20 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
}