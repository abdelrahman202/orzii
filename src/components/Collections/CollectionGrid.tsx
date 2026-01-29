import { collections } from '../../data/collections';
import CollectionTile from './CollectionTile';

interface CollectionGridProps {
  onCollectionSelect?: (collectionId: string) => void;
}

export default function CollectionGrid({
  onCollectionSelect,
}: CollectionGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[#e7ddcc]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#243247] mb-4">
            The ORZI Line
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A refined line of ORZI pieces,<br />from signature icons to upcoming designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionTile
              key={collection.id}
              collection={collection}
              onActionClick={() => onCollectionSelect?.(collection.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
