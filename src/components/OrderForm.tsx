import { useState } from 'react';
import { OrderFormData, governorates } from '../types/form';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  isSubmitting: boolean;
}

export default function OrderForm({ onSubmit, isSubmitting }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    governorate: '',
    area: '',
    address: '',
    straightQuantity: 0,
    curvedQuantity: 0,
    curvedGoldQuantity: 0,
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'governorate' ? { area: '' } : {}),
    }));
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.governorate) newErrors.governorate = 'المحافظة مطلوبة';
    if (!formData.area) newErrors.area = 'المنطقة مطلوبة';
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب';

    const straightQtyInput = document.getElementById('straightQty') as HTMLInputElement;
    const curvedQtyInput = document.getElementById('curvedQty') as HTMLInputElement;
    const curvedGoldQtyInput = document.getElementById('curvedGoldQty') as HTMLInputElement;
    const straightQty = straightQtyInput ? parseInt(straightQtyInput.value) || 0 : 0;
    const curvedQty = curvedQtyInput ? parseInt(curvedQtyInput.value) || 0 : 0;
    const curvedGoldQty = curvedGoldQtyInput ? parseInt(curvedGoldQtyInput.value) || 0 : 0;

    if (straightQty === 0 && curvedQty === 0 && curvedGoldQty === 0) {
      newErrors.address = 'اختر كمية من منتج واحد على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const straightQtyInput = document.getElementById('straightQty') as HTMLInputElement;
      const curvedQtyInput = document.getElementById('curvedQty') as HTMLInputElement;
      const curvedGoldQtyInput = document.getElementById('curvedGoldQty') as HTMLInputElement;

      const straightQty = straightQtyInput ? parseInt(straightQtyInput.value) || 0 : 0;
      const curvedQty = curvedQtyInput ? parseInt(curvedQtyInput.value) || 0 : 0;
      const curvedGoldQty = curvedGoldQtyInput ? parseInt(curvedGoldQtyInput.value) || 0 : 0;

      const finalFormData: OrderFormData = {
        ...formData,
        straightQuantity: straightQty,
        curvedQuantity: curvedQty,
        curvedGoldQuantity: curvedGoldQty,
      };

      onSubmit(finalFormData);
    }
  };

  const areas = formData.governorate
    ? governorates[formData.governorate as keyof typeof governorates]
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[#243247] font-semibold mb-2">
          الاسم <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#243247] focus:border-transparent outline-none transition-all"
          placeholder="أدخل اسمك الكامل"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-[#243247] font-semibold mb-2">
          رقم الهاتف <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#243247] focus:border-transparent outline-none transition-all"
          placeholder="01xxxxxxxxx"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-[#243247] font-semibold mb-2">
          المحافظة <span className="text-red-500">*</span>
        </label>
        <select
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#243247] focus:border-transparent outline-none transition-all"
        >
          <option value="">اختر المحافظة</option>
          {Object.keys(governorates).map((gov) => (
            <option key={gov} value={gov}>
              {gov}
            </option>
          ))}
        </select>
        {errors.governorate && (
          <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>
        )}
      </div>

      <div>
        <label className="block text-[#243247] font-semibold mb-2">
          المنطقة <span className="text-red-500">*</span>
        </label>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          disabled={!formData.governorate}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#243247] focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">اختر المنطقة</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
      </div>

      <div>
        <label className="block text-[#243247] font-semibold mb-2">
          العنوان بالتفصيل <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#243247] focus:border-transparent outline-none transition-all resize-none"
          placeholder="الشارع، رقم المبنى، الدور، معالم قريبة..."
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-[#243247] font-semibold mb-3">
          الكمية المطلوبة من كل منتج <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-gray-300 hover:border-[#243247] rounded-lg p-4 transition-all">
            <img
              src="/straight.jpg"
              alt="إسورة مستقيمة"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <p className="text-center font-semibold text-[#243247] mb-3">Aura</p>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="straightQty" className="text-sm text-gray-700">
                الكمية:
              </label>
              <input
                id="straightQty"
                name="straightQty"
                type="number"
                min="0"
                max="10"
                defaultValue="0"
                className="w-16 px-3 py-2 bg-white border border-gray-300 rounded text-center"
              />
            </div>
          </div>

          <div className="border-2 border-gray-300 hover:border-[#243247] rounded-lg p-4 transition-all">
            <img
              src="/curved.jpg"
              alt="إسورة منحنية"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <p className="text-center font-semibold text-[#243247] mb-3">Harmonia</p>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="curvedQty" className="text-sm text-gray-700">
                الكمية:
              </label>
              <input
                id="curvedQty"
                name="curvedQty"
                type="number"
                min="0"
                max="10"
                defaultValue="0"
                className="w-16 px-3 py-2 bg-white border border-gray-300 rounded text-center"
              />
            </div>
          </div>

          <div className="border-2 border-gray-300 hover:border-[#243247] rounded-lg p-4 transition-all">
            <img
              src="/curvedgold.jpg"
              alt="إسورة منحنية ذهبي"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <p className="text-center font-semibold text-[#243247] mb-3">Sophia</p>
            <p className="text-center text-xs text-gray-600 mb-3">حصري للنساء</p>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="curvedGoldQty" className="text-sm text-gray-700">
                الكمية:
              </label>
              <input
                id="curvedGoldQty"
                name="curvedGoldQty"
                type="number"
                min="0"
                max="10"
                defaultValue="0"
                className="w-16 px-3 py-2 bg-white border border-gray-300 rounded text-center"
              />
            </div>
          </div>
        </div>
        {errors.address && errors.address.includes('منتج') && (
          <p className="text-red-500 text-sm mt-2">{errors.address}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#243247] text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
      </button>
    </form>
  );
}
