# 使用元祖生成联合类型
- [B站](https://www.bilibili.com/video/BV1C5K3zPEcj?spm_id_from=333.788.videopod.sections&vd_source=fd2259d65d6b765562dfc7be43d3480e)
```typescript
const colors: string[] = ['♠', '♥','♣', '◇'] as const; // 扑克牌四种花色
const values: string[] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'] as const; // 扑克牌的数字

type Values = typeof values[number];
type Colors = typeof colors[number];
function createCard(value: Values, color: Colors) {
    
}
```
## as const 详解:
- 数组或对象变成了``只读``, 不能修改元素.
- 类型从 stinrg[] 变成了具体的 ['♠', '♥','♣', '◇'] 元祖类型
- 每个元素的类型也被推断为具体的字面量类型

### 实战一: 定义常量枚举或配置
```typescript
// 定义一组不允许修改的常量
const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
// 类型: readonly ["GET", "POST", "PUT", "DELETE"]
// HTTP_METHODS.push("PATCH"); // ❌ 错误！不能修改

type HttpMethod = typeof HTTP_METHODS[number]; // "GET" | "POST" | "PUT" | "DELETE"
```
### 实战二: 确保对象配置不可变
```typescript
const APP_CONFIG = {
  VERSION: "1.0.0",
  DEBUG: false,
  API_BASE: "https://api.myapp.com"
} as const;

// APP_CONFIG.VERSION = "2.0.0"; // ❌ 错误！属性是只读的
```
### 总结
- as const 告诉 TypeScript：“请把这个字面量当作一个完全不可变的常量来处理，并推断出最具体的字面量类型”。它在定义配置、常量、枚举替代品时特别有用，能显著提高代码的类型安全性和可维护性。
