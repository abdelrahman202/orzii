export default function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-[#e7ddcc] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #243247 25%, transparent 25%, transparent 75%, #243247 75%, #243247), linear-gradient(45deg, #243247 25%, transparent 25%, transparent 75%, #243247 75%, #243247)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#243247] mb-8 leading-tight">
          Born from Heritage<br/>
          Crafted for Identity<br/>
          Worn with Confidence
        </h2>

        <div className="space-y-6 text-lg text-gray-700 font-light max-w-2xl mx-auto">
          <p>
            Orzi 1998 represents more than jewelry—it's a philosophy. Each bracelet embodies
            the essence of timeless elegance, designed for individuals who understand that true
            luxury lies in understated sophistication.
          </p>

          <p>
            Our heritage stretches back decades, rooted in the art of fine craftsmanship.
            We believe in creating pieces that age gracefully, becoming part of your personal
            narrative and style identity.
          </p>

          <p>
            In a world of fleeting trends, we stand for permanence. Our bracelets are not
            mere accessories—they are heirlooms waiting to be inherited, treasures that whisper
            stories of refinement and enduring taste.
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-300">
          <p className="text-sm text-gray-600 font-semibold">
            "Timeless. Refined. Heritage."
          </p>
          <p className="text-gray-500 mt-2">— Orzi 1998</p>
        </div>
      </div>
    </section>
  );
}
