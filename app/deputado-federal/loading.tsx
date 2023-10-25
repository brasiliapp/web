/* eslint-disable @next/next/no-img-element */
const skeletonStyle = "bg-[#D4D4D866] animate-pulse";

export default function Loading() {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="container px-5 mx-auto mt-5 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-700">
          A mudança começa por aqui
        </h2>

        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Se você não acompanhar e não cobrar essas pessoas que estão aqui em
          baixo, o Brasil nunca vai mudar.
        </p>
      </div>

      <div className="flex flex-col w-full gap-4 p-4 rounded-large shadow-small">
        <div className="flex items-center w-full gap-3">
          <div
            className={`w-full max-w-[44%] h-10 rounded-medium ${skeletonStyle}`}
          />

          <div
            className={`w-[110px] ml-auto rounded-medium h-10 ${skeletonStyle}`}
          />
          <div className={`w-[110px] rounded-medium h-10 ${skeletonStyle}`} />
        </div>

        <div
          className={`h-2 w-full max-w-[300px] rounded-medium ${skeletonStyle}`}
        />

        <div className={`h-10 rounded-medium ${skeletonStyle}`} />

        <div className="flex flex-col gap-8 px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => (
            <div key={el} className="flex items-center">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-medium ${skeletonStyle}`} />
                <div
                  className={`h-2 w-[200px] rounded-medium ${skeletonStyle}`}
                />
              </div>

              <div
                className={`h-2 w-10 ml-40 max-[1020px]:hidden rounded-medium ${skeletonStyle}`}
              />
              <div
                className={`h-2 w-10 ml-20 max-[1020px]:hidden rounded-medium ${skeletonStyle}`}
              />
              <div
                className={`h-2 w-[300px] ml-20 mr-4 max-[1020px]:hidden rounded-medium ${skeletonStyle}`}
              />
              <div
                className={`h-6 w-10 ml-auto rounded-medium ${skeletonStyle}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
