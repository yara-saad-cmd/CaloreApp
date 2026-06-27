import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient'; // تأكدي أن مسار ملف السوبابيز سليم بالنسبة لملف App.jsx

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات (States) لتخزين البيانات التي يكتبها المستخدم في الـ Inputs
  const [foodName, setFoodName] = useState('');
  const [caloriesValue, setCaloriesValue] = useState('');

  // 1. دالة جلب البيانات من جدول calores
  const fetchCaloriesData = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('calores') // اسم الجدول عندكِ
      .select('*')
      .order('id', { ascending: false }); // ترتيب من الأحدث للأقدم

    if (error) {
      console.error('خطأ في جلب البيانات:', error.message);
    } else {
      setItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCaloriesData();
  }, []);

  // 2. دالة إضافة طعام وسعرات جديدة إلى جدول calores
  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!foodName || !caloriesValue) {
      alert('من فضلك ادخلي اسم الطعام والسعرات الحرارية');
      return;
    }

    // إرسال البيانات إلى الأعمدة الصحيحة (food و calores)
    const { error } = await supabase
      .from('calores')
      .insert([
        { 
          food: foodName, 
          calores: parseFloat(caloriesValue) // تحويل السعرات لرقم
        }
      ]);

    if (error) {
      console.error('خطأ أثناء الإضافة:', error.message);
      alert('حدث خطأ ولم يتم الحفظ');
    } else {
      alert('تمت الإضافة بنجاح في قاعدة البيانات!');
      // تفريغ الـ Inputs لتكون جاهزة لإدخال جديد
      setFoodName('');
      setCaloriesValue('');
      // تحديث القائمة فوراً لتظهر الإضافة الجديدة على الهاتف والكمبيوتر
      fetchCaloriesData();
    }
  };

  return (
    <div>
      <h2>إدارة السعرات الحرارية للمنتجات</h2>

      {/* استمارة الإضافة */}
      <form onSubmit={handleAddItem}>
        <h3>إضافة عنصر جديد</h3>
        <div>
          <label>اسم الطعام (Food):</label>
          <input 
            type="text" 
            value={foodName} 
            onChange={(e) => setFoodName(e.target.value)} 
            placeholder="مثال: تفاحة"
          />
        </div>
        <div>
          <label>السعرات (Calores):</label>
          <input 
            type="number" 
            value={caloriesValue} 
            onChange={(e) => setCaloriesValue(e.target.value)} 
            placeholder="مثال: 95"
          />
        </div>
        <button type="submit">
          حفظ البيانات
        </button>
      </form>

      {/* جدول العرض المحدث بالأسماء الجديدة */}
      <h3>قائمة الأطعمة والسعرات الحالية</h3>
      {loading ? (
        <p>جاري تحميل البيانات من سوبابيز...</p>
      ) : items.length === 0 ? (
        <p>لا توجد بيانات معروضة حالياً.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>الرقم (ID)</th>
              <th>الطعام (Food)</th>
              <th>السعرات (Calores)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.food}</td>
                <td>{item.calores} كالوري</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;