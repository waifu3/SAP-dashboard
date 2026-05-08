import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
export default function ProductosTop({ datos }) {
  const [sortBy, setSortBy] = useState('ventas');
  const [ascending, setAscending] = useState(false);
  const sorted = [...datos].sort((a, b) => {const aVal = a[sortBy]; const bVal = b[sortBy]; return ascending ? aVal - bVal : bVal - aVal;});
  const formatCurrency = (value) => `$${(value / 1000000).toFixed(1)}M`;
  const toggleSort = (field) => {if (sortBy === field) {setAscending(!ascending);} else {setSortBy(field); setAscending(false);}};
  return (<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="mb-6"><h3 className="text-lg font-bold text-gray-900 dark:text-white">Top 10 Productos</h3><p className="text-sm text-gray-600 dark:text-gray-400">Productos con mayores ingresos</p></div>
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200 dark:border-gray-700">
    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Producto</th>
    <th onClick={() => toggleSort('ventas')} className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"><div className="flex items-center justify-end gap-2">Ventas {sortBy === 'ventas' && (ascending ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</div></th>
    <th onClick={() => toggleSort('cantidad')} className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"><div className="flex items-center justify-end gap-2">Cantidad {sortBy === 'cantidad' && (ascending ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</div></th>
    <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">% Venta</th></tr></thead>
    <tbody>{sorted.map((producto, idx) => {const totalVentas = datos.reduce((acc, p) => acc + p.ventas, 0); const porcentaje = ((producto.ventas / totalVentas) * 100).toFixed(1);
      return (<tr key={producto.id} className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${idx < 3 ? 'bg-blue-50 dark:bg-blue-950' : ''}`}>
      <td className="py-3 px-4"><div><p className="font-medium text-gray-900 dark:text-white">{idx + 1}. {producto.nombre}</p><p className="text-xs text-gray-500 dark:text-gray-400">{producto.id}</p></div></td>
      <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">{formatCurrency(producto.ventas)}</td>
      <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">{producto.cantidad.toLocaleString('es-CL')}</td>
      <td className="text-right py-3 px-4"><div className="flex items-center justify-end gap-2"><div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${porcentaje}%` }}/></div><span className="text-gray-700 dark:text-gray-300 text-xs font-medium w-8">{porcentaje}%</span></div></td></tr>);})}</tbody></table></div></div>);
}
