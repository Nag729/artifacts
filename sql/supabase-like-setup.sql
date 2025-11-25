-- ============================================
-- Supabase セットアップ用 SQL スクリプト
-- ============================================
-- このスクリプトを Supabase の SQL Editor で実行してください
--
-- 1. Supabase Dashboard にログイン
-- 2. プロジェクトを選択
-- 3. 左メニューから「SQL Editor」を開く
-- 4. 「New query」をクリック
-- 5. このスクリプト全体をコピー&ペースト
-- 6. 「Run」をクリック
-- ============================================

-- テーブル作成: likes
-- 記事ごとのいいね情報を保存
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  article_slug TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_slug, ip_address) -- 1記事1IPで1回だけいいねできる
);

-- インデックス作成: 記事スラグとIPアドレスでの検索を高速化
CREATE INDEX IF NOT EXISTS idx_likes_article_slug ON likes(article_slug);
CREATE INDEX IF NOT EXISTS idx_likes_ip_address ON likes(ip_address);

-- ビュー作成: article_likes
-- 記事ごとのいいね数を集計したビュー(パフォーマンス向上のため)
CREATE OR REPLACE VIEW article_likes AS
SELECT
  article_slug,
  COUNT(*) as like_count
FROM likes
GROUP BY article_slug;

-- ============================================
-- Row Level Security (RLS) 設定
-- ============================================

-- RLS を有効化
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- ポリシー1: 誰でもいいね数を閲覧できる
CREATE POLICY "Anyone can view likes"
ON likes
FOR SELECT
USING (true);

-- ポリシー2: いいねの追加
-- 注: 重複チェックは UNIQUE 制約で自動的に行われます
CREATE POLICY "Anyone can insert likes"
ON likes
FOR INSERT
WITH CHECK (true);

-- ポリシー3: いいねの削除は禁止(誤操作防止)
-- 削除が必要な場合は、このポリシーを削除するか、管理者権限で手動削除してください
CREATE POLICY "No one can delete likes"
ON likes
FOR DELETE
USING (false);

-- ============================================
-- セットアップ完了！
-- ============================================
-- 次のステップ:
-- 1. .env ファイルを作成し、以下の環境変数を設定してください
--    NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
--    NUXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
--
-- 2. Supabase URL と Anon Key は以下から取得できます:
--    Settings > API > Project URL と Project API keys (anon public)
--
-- 3. アプリケーションを起動: npm run dev
-- ============================================
