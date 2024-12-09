import{_ as l,c as e,a9 as i,o as t}from"./chunks/framework.BjXht68r.js";const g=JSON.parse('{"title":"数据库调优","description":"数据库调优.","frontmatter":{"title":"数据库调优","description":"数据库调优."},"headers":[],"relativePath":"docs/performance/database.md","filePath":"docs/performance/database.md"}'),r={name:"docs/performance/database.md"};function a(n,o,c,s,d,u){return t(),e("div",null,o[0]||(o[0]=[i('<p>  默认情况下，我们采用 MySQL 8作为业务数据库存储业务数据。针对 MySQL 8 ，你可以采用一系列调优方法来提高数据库的性能。例如：</p><h3 id="_1-硬件与操作系统优化" tabindex="-1"><strong>1. 硬件与操作系统优化</strong> <a class="header-anchor" href="#_1-硬件与操作系统优化" aria-label="Permalink to &quot;**1. 硬件与操作系统优化**&quot;">​</a></h3><ul><li><p><strong>硬盘</strong>：使用 SSD 提升读写速度，尤其是对 IO 密集型操作（如 InnoDB 的事务日志）非常重要。</p></li><li><p><strong>内存</strong>：保证有足够的内存供 <code>innodb_buffer_pool</code> 使用，避免频繁的磁盘访问。</p></li><li><p><strong>CPU</strong>：选择多核高性能 CPU，尤其在高并发场景下，多线程查询能显著受益。</p></li><li><p>操作系统优化</p><ul><li>调整文件描述符限制：<code>ulimit -n 65535</code>。</li><li>确保使用 <code>ext4</code> 或 <code>XFS</code> 文件系统，并开启 <code>noatime</code>。</li><li>禁用 NUMA（非均匀内存访问）以避免性能波动：<code>numactl --interleave=all</code>。</li></ul></li></ul><h3 id="_2-mysql-配置调优" tabindex="-1"><strong>2. MySQL 配置调优</strong> <a class="header-anchor" href="#_2-mysql-配置调优" aria-label="Permalink to &quot;**2. MySQL 配置调优**&quot;">​</a></h3><p>从运维角度，可以通过以下方式优化配置：</p><ul><li><strong>内存使用优化</strong>： <ul><li><code>innodb_buffer_pool_size</code>：设置为物理内存的 60-75%。</li><li><code>innodb_log_buffer_size</code>：对于高事务写入量，设置为 16MB 或更高。</li></ul></li><li><strong>IO 调整</strong>： <ul><li><code>innodb_flush_log_at_trx_commit</code>：设置为 <code>2</code>，以减少磁盘 IO（非关键数据场景）。</li><li><code>sync_binlog=0</code>：对性能敏感但不要求极高可靠性的场景。</li></ul></li><li><strong>并发连接限制</strong>： <ul><li><code>max_connections</code>：根据业务需求设置为合理值，避免连接过多导致资源耗尽。</li><li><code>thread_cache_size</code>：适当增加以减少线程创建开销。</li></ul></li></ul><h3 id="_3-监控与日志管理" tabindex="-1"><strong>3. 监控与日志管理</strong> <a class="header-anchor" href="#_3-监控与日志管理" aria-label="Permalink to &quot;**3. 监控与日志管理**&quot;">​</a></h3><ul><li><strong>开启性能监控</strong>： <ul><li>启用 <code>performance_schema</code> 和 <code>sys</code> 库，监控慢查询、锁等待和资源利用情况。</li><li>使用 <code>SHOW ENGINE INNODB STATUS</code> 分析锁和事务性能。</li></ul></li><li><strong>日志分析</strong>： <ul><li>慢查询日志：通过设置 <code>long_query_time=1</code>，捕获耗时 SQL。</li><li>错误日志：定期检查 <code>error.log</code> 中是否有资源不足或配置异常的警告。</li></ul></li></ul><h3 id="_4-高可用性与灾备" tabindex="-1"><strong>4. 高可用性与灾备</strong> <a class="header-anchor" href="#_4-高可用性与灾备" aria-label="Permalink to &quot;**4. 高可用性与灾备**&quot;">​</a></h3><ul><li><strong>主从复制</strong>： <ul><li>配置 GTID（全局事务 ID）模式，提高主从切换的可靠性。</li></ul></li><li><strong>读写分离</strong>： <ul><li>在高并发场景中，使用 ProxySQL 或 MySQL Router 实现读写分离。</li></ul></li><li><strong>备份策略</strong>： <ul><li>使用 Percona XtraBackup 或 MySQL Enterprise Backup 实现热备份。</li><li>定期测试备份的可恢复性。</li></ul></li></ul>',10)]))}const p=l(r,[["render",a]]);export{g as __pageData,p as default};