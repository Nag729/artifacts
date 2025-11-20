---
title: 'KPGTふりかえり手法の提案'
description: '従来のKPTふりかえりの課題を解決する新しいアプローチ'
tags: ['ふりかえり', 'チーム運営', '手法改善']
date: 2025-11-20
---

## KPT の課題

現在の KPT ふりかえりには、以下の構造的な課題があります：

::check-list
::check-item{type="bad" label="TRY が思い浮かばない"}
Keep, Problem を出した後、「で、何をする？」となり、Try が出にくい場面がある。
::

::check-item{type="bad" label="対応関係が不明確"}
Try と Keep, Problem の対応が FigJam に明文化されず、口頭で確認・脳内で関連付けが必要になっている。フレームワークとして構造的な問題がある。
::

::check-item{type="bad" label="最優先のゴールが曖昧"}
Try の後にゴールを整理しているため、本当にそれが最優先のゴールだったのか曖昧になっている。
::
::

## 根本原因：評価基準（Goal）が後回しになっている

KPT の構造を整理すると：

- **Keep, Problem** = 観測された事実（過去に起きたこと）
- **Try** = 次に取る行動（未来にやること）
- **欠けているもの** = **達成したい状態（Goal）**

ゴールが明確でないと、適切な Try を考えるのが難しく、優先順位も付けづらい。

## 解決策：KPGT への拡張

::diagram{title="KPT に Goal を追加"}
```
K (Keep):    うまくいった事実
P (Problem): うまくいかなかった事実
G (Goal):    そもそも何を達成したいのか ← NEW!
T (Try):     Goalを満たすための仮説
```
::

## 新しいふりかえりフロー

::step-flow
::step{number="1" title="できごとを思い出す" duration="10分"}
これまで通り、期間中の出来事を振り返る。
::

::step{number="2" title="Keep, Problem を出す" duration="10分"}
- **Keep**: うまくいったこと
- **Problem**: うまくいかなかったこと
::

::step{number="3" title="Goal（達成したい状態）を確認・言語化" duration="10分"}
🆕 Keep, Problem を見ながら：

- 「この Problem って、どういう状態になれば解決？」
- 「複数の Problem に共通するテーマは？」
- 「そもそも私たちは何を達成したいんだっけ？」

を話し合い、達成したいゴールを言語化する。
::

::step{number="4" title="投票して解決する Goal を決める" duration="5分"}
🆕 出された Goal の中から、今期取り組む Goal を投票で選ぶ。
（≒ 取り組む Keep, Problem を決める）
::

::step{number="5" title="Try を出す" duration="10分"}
**選ばれた Goal を満たすための仮説** として、Try を考える。
この時点で、Try と Goal の対応関係が明確になっている。
::

::step{number="6" title="投票して Try を決める" duration="5分"}
Goal への寄与度を基準に、実施する Try を投票で選ぶ。
::

::step{number="7" title="SMART な目標にする" duration="10分"}
選ばれた Try を、SMART（具体的・測定可能・達成可能・関連性・期限）な目標に落とし込む。
::
::

::alert{type="info"}
**合計：60 分**

※Goal に時間をかけても、Try 出しが効率化するため総時間は変わらない
::

## KPGT の効果

::benefit-list
::benefit-item{title="Try が出しやすくなる" icon="mdi:lightbulb-on"}
「何をする？」ではなく「この Goal を達成するには？」という明確な問いに変わる。
::

::benefit-item{title="Try と Problem の対応が明確" icon="mdi:link-variant"}
どの Goal のための Try なのかが構造的に明確になり、FigJam 上でも可視化しやすい。
::

::benefit-item{title="優先度を間違えない" icon="mdi:arrow-up-bold"}
最優先の Goal が先に決まっているため、本質的でない Try を選んでしまうリスクが減る。
::

::benefit-item{title="投票が2段階になり判断しやすい" icon="mdi:vote"}
**第1段階**: Goal 選択（何を達成したいか）
**第2段階**: Try 選択（どう達成するか）

判断基準が明確になり、投票しやすい。
::

::benefit-item{title="次回の評価がしやすい" icon="mdi:chart-line"}
次のふりかえりで「前回の Goal は達成できたか？」を基準に評価できる。
::
::

## Goal を出すときのコツ

::alert{type="info"}
### 問いかけ例

- 「この Problem って、どういう状態になれば解決？」
- 「複数の Problem に共通するテーマは？」
- 「そもそも私たちは何を達成したいんだっけ？」
::

::check-list
::check-item{type="good" label="測定可能"}
状態を確認できる
::

::check-item{type="good" label="具体的"}
Try とのつながりがイメージできる

- 「全員が週次でリリースできる状態を保つ」
- 「新メンバーが 2 週間で自走できる」
- 「本番障害をゼロにする」
::

::check-item{type="bad" label="抽象的すぎる"}
Try を考えにくく、評価もできない

- 「チームを良くする」
- 「生産性を上げる」
::
::

## まずは実験として

次回のふりかえりで試してみて、効果を測定しましょう：

::check-list
::check-item{type="good" label="Try 出しの時間"}
Try 出しの時間が減ったか
::

::check-item{type="good" label="投票のスムーズさ"}
投票がスムーズになったか
::

::check-item{type="good" label="対応関係の明確さ"}
Try と Problem の対応が明確になったか
::

::check-item{type="good" label="納得感"}
チーム全体で納得感のある Try を選べたか
::
::

## まとめ

::key-points{title="KPGT で得られる効果"}
- 何を達成したいかが明確になる
- Try が出しやすくなる
- 優先度を間違えない
- 評価しやすくなる
::

---

_手法提案として作成 / 2025_
