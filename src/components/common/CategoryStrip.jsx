import women from "../../assets/images/woman.png";
import men from "../../assets/images/man.png";
import baby from "../../assets/images/baby.jpg";
import kids from "../../assets/images/kids.png";
import bag from "../../assets/images/bag.png";
import shoe from "../../assets/images/shoe.png";

const categories = [
  { title: "Women", image: women },
  { title: "Men", image: men },
  { title: "Baby", image: baby },
  { title: "Kids", image: kids },
  { title: "Accessories", image: bag },
  { title: "Footwear", image: shoe },
];

export default function CategoryStrip() {
  return (
    <section className="category-strip container">
      <div className="category-wrapper shadow-sm rounded-4 bg-white p-3 p-lg-4">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">

          {categories.map((item, index) => (
            <div className="col" key={index}>
              <div className="category-card text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="category-img mx-auto d-block" />

                <p className="mb-0 mt-2 fw-medium">
                  {item.title}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}