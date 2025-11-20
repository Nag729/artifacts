/**
 * コンポーネントのカラーバリエーション管理
 */

export type ColorVariant = 'info' | 'success' | 'warning' | 'danger'

export interface VariantConfig {
  bg: string
  border: string
  text: string
  icon: string
  defaultIcon: string
}

/**
 * カラーバリエーションごとの設定を取得
 */
export const useComponentVariants = () => {
  const variantConfig: Record<ColorVariant, VariantConfig> = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-500',
      text: 'text-blue-900 dark:text-blue-100',
      icon: 'text-blue-600 dark:text-blue-400',
      defaultIcon: 'mdi:information-outline',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-500',
      text: 'text-green-900 dark:text-green-100',
      icon: 'text-green-600 dark:text-green-400',
      defaultIcon: 'mdi:check-circle-outline',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/30',
      border: 'border-yellow-500',
      text: 'text-yellow-900 dark:text-yellow-100',
      icon: 'text-yellow-600 dark:text-yellow-400',
      defaultIcon: 'mdi:alert-outline',
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-500',
      text: 'text-red-900 dark:text-red-100',
      icon: 'text-red-600 dark:text-red-400',
      defaultIcon: 'mdi:alert-circle-outline',
    },
  }

  /**
   * 指定したバリアントの設定を取得
   */
  const getVariant = (variant: ColorVariant): VariantConfig => {
    return variantConfig[variant]
  }

  /**
   * good/bad を success/danger にマッピング
   */
  const mapGoodBad = (type: 'good' | 'bad'): ColorVariant => {
    return type === 'good' ? 'success' : 'danger'
  }

  /**
   * good/bad 用のアイコンを取得
   */
  const getCheckIcon = (type: 'good' | 'bad'): string => {
    return type === 'good' ? 'mdi:check-circle' : 'mdi:close-circle'
  }

  return {
    variantConfig,
    getVariant,
    mapGoodBad,
    getCheckIcon,
  }
}
